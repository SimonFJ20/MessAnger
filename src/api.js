const express = require('express');
const mongodb = require('mongodb');
const users = require('./api/users');
const rooms = require('./api/rooms');
const messages = require('./api/messages');
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
    rooms(router, db, '/rooms');
    messages(router, db, '/messages');

    // dev area

    let prefix = '/users';

    router.post(prefix + '/login', async (req, res) => {

    });

    router.post(prefix + '/logout', async (req, res) => {

    });

    router.post(prefix + '/checktoken', async (req, res) => {

    });

    router.post('/users/register', async (req, res) => {
        console.log('fdsfdsf')
        try {
            const user = {
                username: req.body.username,
                password: await bcrypt.hash(req.body.password),
                email: req.body.email,
                bio: req.body.bio ? req.body.bio : ''
            }

            const existingUsernameUser = await db.users.findOne({username: user.username});
            if(existingUsernameUser) {
                res.status(400).json({success: false, response: 'username taken'});
                return;
            }

            const existingEmailUser = await db.users.findOne({email: user.email});
            if(existingEmailUser) {
                res.status(400).json({success: false, response: 'username taken'});
                return;
            }

            const insert = await db.users.insertOne(user);
            res.status(200).json({success: true, response: 'success', userId: insert.ops[0]._id});
        } catch(e) {
            res.status(500).json({success: false, response: 'error'});
            console.error('Error on /api/users/register');
            //console.error(e);
        }
    });

    router.get(prefix + '/getdata', async (req, res) => {

    });


    // dev area end

}

api();
module.exports = router;
