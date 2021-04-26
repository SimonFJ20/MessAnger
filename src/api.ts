import { Router } from 'express';
import { Db, MongoClient } from 'mongodb';

export const mongodbConnect = async () => {
    try {
        const mongoURI = <string>process.env.MONGODB;
        const client = new MongoClient(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});
        await client.connect();
        const database = client.db('MessAngerV2');
        console.log('Connected to MongoDB Cloud');
        return database;
    } catch(e) {
        console.error(e);
    }
}

export const api = async () => {
    const router = Router();
    
    const mongodbConnection = <Db>await mongodbConnect();

    const Users = mongodbConnection.collection('users');
    const Rooms = mongodbConnection.collection('rooms');
    const Messages = mongodbConnection.collection('messages');
    const Tokens = mongodbConnection.collection('tokens');
    const SpecialTokens = mongodbConnection.collection('specialTokens');
    
    
    router.get('')
    
    
    return router;
}

