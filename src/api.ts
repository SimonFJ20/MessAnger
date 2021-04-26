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


    router.get('/rooms/getdata', async (req, res) => {
        try {
            
        } catch(error) {
            res.status(500).json({success: false, status: 'error'});
            console.error('Error on route /rooms/getdata', error);
        }
    });

    router.get('/rooms/get', async (req, res) => {
        try {
            
        } catch(error) {
            res.status(500).json({success: false, status: 'error'});
            console.error('Error on route /rooms/get', error);
        }
    });

    router.get('/rooms/search', async (req, res) => {
        try {
            
        } catch(error) {
            res.status(500).json({success: false, status: 'error'});
            console.error('Error on route /rooms/search', error);
        }
    });

    router.get('/rooms/getconstrained', async (req, res) => {
        try {
            
        } catch(error) {
            res.status(500).json({success: false, status: 'error'});
            console.error('Error on route /rooms/getconstrained', error);
        }
    });

    router.get('/rooms/getuser', async (req, res) => {
        try {
            
        } catch(error) {
            res.status(500).json({success: false, status: 'error'});
            console.error('Error on route /rooms/getuser', error);
        }
    });

    router.get('/rooms/getlist', async (req, res) => {
        try {
            
        } catch(error) {
            res.status(500).json({success: false, status: 'error'});
            console.error('Error on route /rooms/getlist', error);
        }
    });

    router.post('/rooms/create', async (req, res) => {
        try {
            
        } catch(error) {
            res.status(500).json({success: false, status: 'error'});
            console.error('Error on route /rooms/create', error);
        }
    });

    router.post('/rooms/join', async (req, res) => {
        try {
            
        } catch(error) {
            res.status(500).json({success: false, status: 'error'});
            console.error('Error on route /rooms/join', error);
        }
    });





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
