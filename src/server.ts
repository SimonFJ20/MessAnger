import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { api } from './api';

dotenv.config();

try {
    
    const portHTTP = <string>process.env.HTTP_PORT;
    
    const server = express();
    
    server.use(cors({}));
    server.use(express.json());
    server.use(express.urlencoded({extended: true}));
    
    server.use('/api', api);
    server.use(express.static(path.join(__dirname, '../public')));
    
    server.listen(portHTTP, () => {
        console.log('MessAnger backend on port', portHTTP);
    });
    
} catch(error) {
    
    console.error('Failed to start server', error);
    
}