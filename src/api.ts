import { Router } from 'express';
import { Db } from 'mongodb';



export const api = async (mongodbConnection: Db) => {
    const router = Router();

    const Users = mongodbConnection.collection('users');
    const Rooms = mongodbConnection.collection('rooms');
    const Messages = mongodbConnection.collection('messages');
    const Tokens = mongodbConnection.collection('tokens');
    const SpecialTokens = mongodbConnection.collection('specialTokens');

    router.post('/users/login', async (req, res) => {
        try {
            
        } catch(error) {
            res.status(500).json({success: false, status: 'error'});
            console.error('Error on route /users/login', error);
        }
    });

    router.post('/users/logout', async (req, res) => {
        try {
            
        } catch(error) {
            res.status(500).json({success: false, status: 'error'});
            console.error('Error on route /users/logout', error);
        }
    });

    router.post('/users/checktoken', async (req, res) => {
        try {
            
        } catch(error) {
            res.status(500).json({success: false, status: 'error'});
            console.error('Error on route /users/checktoken', error);
        }
    });

    router.post('/users/register', async (req, res) => {
        try {
            
        } catch(error) {
            res.status(500).json({success: false, status: 'error'});
            console.error('Error on route /users/register', error);
        }
    });

    router.get('/users/getdata', async (req, res) => {
        try {
            
        } catch(error) {
            res.status(500).json({success: false, status: 'error'});
            console.error('Error on route /users/getdata', error);
        }
    });





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
