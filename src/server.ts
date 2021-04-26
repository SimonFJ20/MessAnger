import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { Db, MongoClient } from 'mongodb';
import { api } from './api';

const connectToMongodb = async () => {
    try {
        const mongoURI = <string>process.env.MONGODB;
        const client = new MongoClient(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});
        await client.connect();
        const database = client.db('MessAngerV2');
        console.log('Connected to MongoDB Cloud');
        return database;
    } catch(error) {
        console.error('Error connecting to MongoDB', error);
    }
}

const server = async () => {
    dotenv.config();
    
    const portHTTP = parseInt(<string>process.env.HTTP_PORT);
    
    const server = express();
    
    server.use(cors({}));
    server.use(express.json());
    server.use(express.urlencoded({extended: true}));
    
    server.use('/api', await api(<Db>await connectToMongodb()));
    server.use(express.static(path.join(__dirname, '../public')));
    
    server.listen(portHTTP, () => {
        console.log('MessAnger backend on port', portHTTP);
    });
}




server().catch((error) => {
    console.error('Failed to start server', error);
})
