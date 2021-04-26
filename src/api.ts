import { Router } from 'express';
import { Db } from 'mongodb';
import { exists } from './utils';


export const api = async (database: Db) => {
    const router = Router();

    const Users = database.collection('users');
    const Rooms = database.collection('rooms');
    const Messages = database.collection('messages');
    const Tokens = database.collection('tokens');
    const SpecialTokens = database.collection('specialTokens');



    router.get('/messages/get', async (req, res) => {
        try {
            
        } catch(error) {
            res.status(500).json({success: false, status: 'error'});
            console.error('Error on route /messages/get', error);
        }
    });

    router.get('/messages/getlist', async (req, res) => {
        try {
            
        } catch(error) {
            res.status(500).json({success: false, status: 'error'});
            console.error('Error on route /messages/getlist', error);
        }
    });

    router.post('/messages/post', async (req, res) => {
        try {
            
        } catch(error) {
            res.status(500).json({success: false, status: 'error'});
            console.error('Error on route /messages/post', error);
        }
    });


    return router;
}
