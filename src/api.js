const express = require('express');
const mongodb = require('mongodb');
const users = require('./api/users');
const rooms = require('./api/rooms');
const messages = require('./api/messages');
const router = express.Router();

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

    users(router, db);
    rooms(router, db);
    messages(router, db);

}

api();
module.exports = router;
