const express = require('express');
const mongodb = require('mongodb');
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

    router.get(prefix + '/getuser', async (req, res) => {

    });

    router.get(prefix + '/getlist', async (req, res) => {

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
                _id: token.user
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

            const room = await db.rooms.findOne({_id: req.body.roomId});
            if(!room) {
                res.status(400).json({success: false, response: 'unknown room'});
                return;
            }

            if(req.body.password !== room.password && room.password !== '') {
                res.status(400).json({success: false, response: 'denied'});
                return;
            }

            await db.rooms.updateOne({
                _id: room._id
            }, {
                $addToSet: {
                    users: token.user,
                }
            });

            await db.users.updateOne({
                _id: token.user
            }, {
                $addToSet: {
                    joinedRooms: room._id,
                }
            });

            res.status(200).json({
                success: true, 
                response: 'success',
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
