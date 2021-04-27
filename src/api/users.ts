import { Router } from "express";
import { Db, ObjectId } from "mongodb";
import { either, exists, generateId, validateEmail, validateUsername } from "../utils";
import bcrypt from 'bcrypt';

const setUsersLogin = (router: Router, database: Db, route: string) => {
    router.post(route, async (req, res) => {
        try {
            const Users = database.collection('users');
            const Tokens = database.collection('tokens');
            
            if(!exists(req.body.username, req.body.password)) {
                res.status(400).json({success: false, response: 'incomplete'});
                return;
            }
            
            const username = req.body.username;

            const user = await Users.findOne({username: username});
            if(!user) {
                res.status(400).json({success: false, response: 'unknown'});
                return;
            }

            const passwordMatch = await bcrypt.compare(req.body.password, user.password);
            if(!passwordMatch) {
                res.status(400).json({success: false, response: 'unknown'});
                return;
            }

            const tokenInsert = await Tokens.insertOne({
                token: generateId(32),
                user: user._id,
                createdAt: Date()
            });
            
            user.lastOnline = Date();
            const replacedUser = await Users.replaceOne({_id: new ObjectId(user._id)}, user);
            
            res.status(200).json({
                success: true,
                response: 'success',
                userId: user.id,
                username: user.username,
                token: tokenInsert.ops[0].token
            });
        } catch(error) {
            res.status(500).json({success: false, response: 'error'});
            console.error('Error on route ' + route, error);
        }
    });
}



const setUsersLogout = (router: Router, database: Db, route: string) => {
    router.post(route, async (req, res) => {
        try {
            const Tokens = database.collection('tokens');

            if(!exists(req.body.token)) {
                res.status(400).json({success: false, response: 'incomplete'});
                return;
            }

            const token = req.body.token;

            const existingToken = await Tokens.findOne({token: token});
            if(!existingToken) {
                res.status(400).json({success: false, response: 'unknown'});
                return;
            }

            const deletedToken = await Tokens.deleteOne({_id: new ObjectId(existingToken._id)});
            if(deletedToken.deletedCount !== 1) {
                res.status(500).json({success: false, response: 'error'});
                return;
            }

            res.status(200).json({
                success: true,
                response: 'success'
            });
        } catch(error) {
            res.status(500).json({success: false, response: 'error'});
            console.error('Error on route ' + route, error);
        }
    });
}



const setUsersChecktoken = (router: Router, database: Db, route: string) => {
    router.post(route, async (req, res) => {
        try {
            const Tokens = database.collection('tokens');

            if(!exists(req.body.token)) {
                res.status(400).json({success: false, response: 'incomplete'});
                return;
            }

            const token = req.body.token;

            const existingToken = await Tokens.findOne({token: token});
            if(!existingToken) {
                res.status(400).json({success: false, response: 'unknown'});
                return;
            }

            res.status(200).json({
                success: true, 
                response: 'success'
            });
        } catch(error) {
            res.status(500).json({success: false, response: 'error'});
            console.error('Error on route ' + route, error);
        }
    });
}


const setUsersRegister = (router: Router, database: Db, route: string) => {
    router.post(route, async (req, res) => {
        try {
            const Users = database.collection('users');

            if(!exists(req.body.username, req.body.password, req.body.email)) {
                res.status(400).json({success: false, response: 'incomplete'});
                return;
            }

            const user = {
                username: req.body.username,
                password: await bcrypt.hash(req.body.password, 10),
                email: req.body.email,
                bio: either(req.body.bio, '')
            }

            if(!validateUsername(user.username)) {
                res.status(400).json({success: false, response: 'username inappropriate'});
                return;
            }

            if(!validateEmail(user.email)) {
                res.status(400).json({success: false, response: 'email invalid'});
                return;
            }

            const existingUsernameUser = await Users.findOne({username: user.username});
            if(existingUsernameUser) {
                res.status(400).json({success: false, response: 'username taken'});
                return;
            }

            const existingEmailUser = await Users.findOne({email: user.email});
            if(existingEmailUser) {
                res.status(400).json({success: false, response: 'email taken'});
                return;
            }

            const userInsert = await Users.insertOne({
                username: user.username,
                password: user.password,
                email: user.email,
                bio: user.bio,
                joinedRooms: [],
                createdRooms: [],
                lastOnline: Date(),
                createdAt: Date()
            });
            
            res.status(200).json({
                success: true,
                response: 'success',
                userId: userInsert.ops[0]._id
            });
        } catch(error) {
            res.status(500).json({success: false, response: 'error'});
            console.error('Error on route ' + route, error);
        }
    });
}


const setUsersGetdata = (router: Router, database: Db, route: string) => {
    router.get(route, async (req, res) => {
        try {
            const Users = database.collection('users');
            const Messages = database.collection('messages');
            const Tokens = database.collection('tokens');

            if(!exists(req.body.token)) {
                res.status(400).json({success: false, response: 'incomplete'});
                return;
            }

            const token = req.body.token;

            const existingToken = await Tokens.findOne({token: token});
            if(!existingToken) {
                res.status(400).json({success: false, response: 'unknown'});
                return;
            }

            const user = await Users.findOne({_id: new ObjectId(existingToken.user)});
            
            const messages: string[] = [];
            const messageCursor = Messages.find({author: user._id}, {projection: {_id: 1}});
            await messageCursor.forEach(message => messages.push(message));

            res.status(200).json({
                success: true, 
                response: 'success',
                ...user,
                messages: messages
            });
        } catch(error) {
            res.status(500).json({success: false, response: 'error'});
            console.error('Error on route ' + route, error);
        }
    });
}


export const setUsers = (router: Router, database: Db, route: string) => {
    setUsersLogin(router, database, route + '/login');
    setUsersLogout(router, database, route + '/logout');
    setUsersChecktoken(router, database, route + '/checktoken');
    setUsersRegister(router, database, route + '/register');
    setUsersGetdata(router, database, route + '/getdata');
}
