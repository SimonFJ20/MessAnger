import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
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
    
    const app = express();
    const server = http.createServer(app);
    
    app.use(cors({}));
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    
    app.use('/api', await api(<Db>await connectToMongodb()));
    app.use(express.static(path.join(__dirname, '../public')));
    
    server.listen(portHTTP, () => {
        console.log('MessAnger backend on port', portHTTP);
    });
}

server().catch((error) => {
    console.error('Failed to start server', error);
})
