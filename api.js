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
    console.log('mongoURI:', typeof mongoURI);
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
                token: req.body.token,
                name: req.body.name,
                description: req.body.description ? req.body.description : '',
                status: req.body.status,
                password: req.body.password ? req.body.password : ''
            }

            res.status(200).json({
                success: true, 
                response: 'success'
            });
        } catch(e) {
            res.status(500).json({success: false, response: 'error'});
            console.error('Error on /api/rooms/create');
            console.error(e);
        }
    });

    router.post(prefix + '/join', async (req, res) => {

    });


    // dev area end

}

api();
module.exports = router;
