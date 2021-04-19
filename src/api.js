const express = require('express');
const mongodb = require('mongodb');
const { ObjectId } = require('mongodb');
const { validateEmail, generateId } = require('./utils');
const users = require('./api/users');
//const rooms = require('./api/rooms');
//const messages = require('./api/messages');
const router = express.Router();

const bcrypt = require('bcrypt');

const api = async () => {

    const mongoURI = process.env.MONGODB;
    const client = new mongodb.MongoClient(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});
    await client.connect();
    console.log('Connected to MongoDB Cloud');
    const database = client.db('MessAnger');

    const db = {
        users: database.collection('users'),
        rooms: database.collection('rooms'),
        messages: database.collection('messages'),
        tokens: database.collection('tokens'),
        specialTokens: database.collection('specialTokens')
    }

    users(router, db, '/users');
    //rooms(router, db, '/rooms');
    //messages(router, db, '/messages');

    // dev area

    let prefix = '/rooms';

    router.get(prefix + '/getall', async (req, res) => {

    });

    router.get(prefix + '/get', async (req, res) => {

    });

    router.get(prefix + '/search', async (req, res) => {

    });

    router.get(prefix + '/getconstrained', async (req, res) => {

    });

    // TODO fix, low priority
    router.get(prefix + '/getuser', async (req, res) => {
        try {
            const token = await db.tokens.findOne({token: req.body.token});
            if(!token) {
                res.status(400).json({success: false, response: 'unknown'});
                return;
            }

            const cursor = await db.rooms.find({users: {$in: [token.user]}}, {projection: {_id: 1}});
            
            console.log(await cursor.count());
            const rooms = [];
            await cursor.forEach(room => {rooms.push(room._id)});

            res.status(200).json(rooms);
        } catch(e) {
            res.status(500).json({success: false, response: 'error'});
            console.error('Error on /api/rooms/getuser');
            console.error(e);
        }
    });

    router.get(prefix + '/getlist', async (req, res) => {
        try {
            
            const roomIds = req.body.rooms;
            const token = req.body.token ? req.body.token : '';
            const specialToken = req.body.specialToken ? req.body.specialTokens : '';

            let rooms = [];
            for(let i in roomIds) {
                const room = await db.rooms.findOne({_id: ObjectId(roomIds[i])});
                if(room.status === 'private') {
                    if(token !== '') {
                        const dbToken = await db.tokens.findOne({token: token});
                        if(dbToken.user !== room.creator) continue;
                    } else if(specialToken !== '') {
                        const dbSpecialToken = await db.specialTokens.findOne({token: token});
                        if(!dbSpecialToken) continue;
                    } else continue;
                }
                rooms.push(room);
            }

            res.status(200).json(rooms);
        } catch(e) {
            res.status(500).json({success: false, response: 'error'});
            console.error('Error on /api/rooms/getlist');
            console.error(e);
        }
    });

    router.post(prefix + '/create', async (req, res) => {
        try {
            const room = {
                name: req.body.name,
                description: req.body.description ? req.body.description : '',
                status: req.body.status,
                password: req.body.password ? req.body.password : ''
            }
            
            const token = await db.tokens.findOne({token: req.body.token});
            if(!token) {
                res.status(400).json({success: false, response: 'unknown'});
                return;
            }

            const existingNameRoom = await db.rooms.findOne({name: room.name});
            if(existingNameRoom) {
                res.status(400).json({success: false, response: 'name taken'});
                return;
            }

            if(room.status === 'private' && room.password === '') {
                res.status(400).json({success: false, response: 'no password'});
                return;
            }

            
            if(room.status !== 'public' && room.status !== 'hidden' && room.status !== 'private') {
                res.status(400).json({success: false, response: 'error'});
                return;
            }

            const insertedRoom = await db.rooms.insertOne({
                name: room.name,
                description: room.description,
                creator: token.user,
                users: [token.user],
                status: room.status,
                password: room.status === 'private' ? room.password : '',
                messages: [],
                createdAt: Date()
            });

            await db.users.updateOne({
                _id: ObjectId(token.user)
            }, {
                $addToSet: {
                    createdRooms: insertedRoom.ops[0]._id,
                    joinedRooms: insertedRoom.ops[0]._id
                }
            });

            res.status(200).json({
                success: true, 
                response: 'success',
                roomId: insertedRoom.ops[0]._id
            });
        } catch(e) {
            res.status(500).json({success: false, response: 'error'});
            console.error('Error on /api/rooms/create');
            console.error(e);
        }
    });

    router.post(prefix + '/join', async (req, res) => {
        try {
            const token = await db.tokens.findOne({token: req.body.token});
            if(!token) {
                res.status(400).json({success: false, response: 'unknown token'});
                return;
            }

            const room = await db.rooms.findOne({'_id': ObjectId(req.body.roomId)});
            if(!room) {
                res.status(400).json({success: false, response: 'unknown room'});
                return;
            }

            const password = req.body.password ? req.body.password : '';
            if(password !== room.password && room.password && room.status === 'private') {
                res.status(400).json({success: false, response: 'denied'});
                return;
            }

            const user = await db.users.findOne({_id: ObjectId(token.user)});
            for(let i in user.joinedRooms) {
                if(user.joinedRooms[i].toString() === room._id.toString()) {
                    res.status(400).json({success: false, response: 'already joined'});
                    return;
                }
            }

            await db.rooms.updateOne({
                _id: ObjectId(room._id)
            }, {
                $addToSet: {
                    users: token.user,
                }
            });

            await db.users.updateOne({
                _id: ObjectId(token.user)
            }, {
                $addToSet: {
                    joinedRooms: room._id,
                }
            });

            res.status(200).json({
                success: true, 
                response: 'success'
            });
        } catch(e) {
            res.status(500).json({success: false, response: 'error'});
            console.error('Error on /api/rooms/join');
            console.error(e);
        }
    });


    // dev area end

}

api();
module.exports = router;
