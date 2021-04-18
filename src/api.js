const express = require('express');
const mongodb = require('mongodb');
const bcrypt = require('bcrypt');
const router = express.Router();

const api = async () => {

    const mongoURI = process.env.MONGODB;
    const client = new mongodb.MongoClient(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});
    await client.connect();
    console.log('Connected to MongoDB Cloud');
    const database = client.db('swiftAppMessenger');

    const Rooms = database.collection('rooms');
    const Messages = database.collection('messages');
    const Users = database.collection('users');



}

api();
module.exports = router;
