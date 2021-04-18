const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const { validateEmail, generateId } = require('../utils');


const users = (router, db, prefix) => {

    router.post(prefix + '/login', async (req, res) => {
        try {
            const username = req.body.username;

            const user = await db.users.findOne({username: username});
            if(!user) {
                res.status(400).json({success: false, response: 'unknown'});
                return;
            }

            const passwordMatch = await bcrypt.compare(req.body.password, user.password);
            if(!passwordMatch) {
                res.status(400).json({success: false, response: 'unknown'});
                return;
            }

            const insert = await db.tokens.insertOne({
                token: generateId(32),
                user: user._id,
                createdAt: Date()
            });
            
            res.status(200).json({
                success: true, 
                response: 'success', 
                userId: user._id, 
                username: user.username, 
                token: insert.ops[0].token
            });
        } catch(e) {
            res.status(500).json({success: false, response: 'error'});
            console.error('Error on /api/users/login');
            console.error(e);
        }
    });

    router.post(prefix + '/logout', async (req, res) => {
        try {
            const token = req.body.token;

            const existingToken = await db.tokens.findOne({token: token});
            if(!existingToken) {
                res.status(400).json({success: false, response: 'unknown'});
                return;
            }

            const deletedToken = await db.tokens.deleteOne({_id: ObjectId(existingToken._id)});

            if(deletedToken.deletedCount !== 1) {
                res.status(500).json({success: false, response: 'error'});
                return;
            }

            res.status(200).json({
                success: true, 
                response: 'success'
            });
        } catch(e) {
            res.status(500).json({success: false, response: 'error'});
            console.error('Error on /api/users/logout');
            console.error(e);
        }
    });

    router.post(prefix + '/checktoken', async (req, res) => {
        try {
            const token = req.body.token;

            const existingToken = await db.tokens.findOne({token: token});
            if(!existingToken) {
                res.status(400).json({success: false, response: 'unknown'});
                return;
            }

            res.status(200).json({
                success: true, 
                response: 'success'
            });
        } catch(e) {
            res.status(500).json({success: false, response: 'error'});
            console.error('Error on /api/users/checktoken');
            console.error(e);
        }
    });

    router.post(prefix + '/register', async (req, res) => {
        try {
            const user = {
                username: req.body.username,
                password: await bcrypt.hash(req.body.password, 10),
                email: req.body.email,
                bio: req.body.bio ? req.body.bio : ''
            }

            if(!validateEmail(user.email)) {
                res.status(400).json({success: false, response: 'email invalid'});
                return;
            }

            const existingUsernameUser = await db.users.findOne({username: user.username});
            if(existingUsernameUser) {
                res.status(400).json({success: false, response: 'username taken'});
                return;
            }

            const existingEmailUser = await db.users.findOne({email: user.email});
            if(existingEmailUser) {
                res.status(400).json({success: false, response: 'email taken'});
                return;
            }

            const insert = await db.users.insertOne({
                username: user.username,
                password: user.password,
                email: user.email,
                bio: user.bio,
                joinedRooms: [],
                createdRooms: [],
                lastOnline: Date(),
                createdAt: Date()
            });
            res.status(200).json({success: true, response: 'success', userId: insert.ops[0]._id});
        } catch(e) {
            res.status(500).json({success: false, response: 'error'});
            console.error('Error on /api/users/register');
            console.error(e);
        }
    });

    // TODO lower priority
    // add joined, created, messages
    router.get(prefix + '/getdata', async (req, res) => {
        try {
            const token = req.body.token;

            const existingToken = await db.tokens.findOne({token: token});
            if(!existingToken) {
                res.status(400).json({success: false, response: 'unknown'});
                return;
            }

            const user = await db.users.findOne({_id: ObjectId(existingToken.user)});

            res.status(200).json({
                success: true, 
                response: 'success',
                ...user
            });
        } catch(e) {
            res.status(500).json({success: false, response: 'error'});
            console.error('Error on /api/users/getdata');
            console.error(e);
        }
    });

}

module.exports = users;