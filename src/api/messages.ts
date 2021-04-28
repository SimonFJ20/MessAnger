import { Router } from "express";
import { Db, ObjectId } from "mongodb";
import { exists } from "../utils";



const setMessagsGet = (router: Router, database: Db, route: string) => {
    router.get(route, async (req, res) => {
        try {
            const Messages = database.collection('messages');

            if(!req.body || req.body === {}) req.body = JSON.parse(<string>req.headers['data-body']);
            
            if(!exists(req.body.messageId)) {
                res.status(400).json({success: false, response: 'incomplete'});
                return;
            }

            const messageId = req.body.messageId as string;

            const message = await Messages.findOne({_id: new ObjectId(messageId)});
            if(!message) {
                res.status(400).json({success: false, response: 'unknown'});
                return;
            }
            
            res.status(200).json({
                success: true,
                response: 'success',
                messageId: message._id,
                roomId: message.room,
                message: message.message,
                author: message.author,
                timestamp: message.createdAt
            });
        } catch(error) {
            res.status(500).json({success: false, response: 'error'});
            console.error('Error on route ' + route, error);
        }
    });
}

const setMessagsGetlist = (router: Router, database: Db, route: string) => {
    router.get(route, async (req, res) => {
        try {
            const Messages = database.collection('messages');

            if(!req.body || req.body === {}) req.body = JSON.parse(<string>req.headers['data-body']);
            
            if(!exists(req.body.messages)) {
                res.status(400).json({success: false, response: 'incomplete'});
                return;
            }

            const messageList = req.body.messages as string[];
            const messageIdList = messageList.map(m => new ObjectId(m));

            const messageCursor = Messages.find({_id: {$in: messageIdList}}).sort({createdAt: 1});

            if(await messageCursor.count() === 0) {
                res.status(200).json({success: true, response: 'no result'});
                return;
            }

            const messages: object[] = [];
            await messageCursor.forEach(m => messages.push(m));
            
            res.status(200).json({
                success: true,
                response: 'success',
                messages: messages
            });
        } catch(error) {
            res.status(500).json({success: false, response: 'error'});
            console.error('Error on route ' + route, error);
        }
    });
}

const setMessagsPost = (router: Router, database: Db, route: string) => {
    router.post(route, async (req, res) => {
        try {
            const Rooms = database.collection('rooms');
            const Messages = database.collection('messages');
            const Tokens = database.collection('tokens');

            if(!exists(req.body.token, req.body.roomId, req.body.message)) {
                res.status(400).json({success: false, response: 'incomplete'});
                return;
            }

            if(typeof (req.body.message) !== 'string' || req.body.message === '') {
                res.status(400).json({success: false, response: 'incomplete'});
                return;
            }

            const message = req.body.message as string;

            const token = req.body.token;
            const existingToken = await Tokens.findOne({token: token});
            if(!existingToken) {
                res.status(400).json({success: false, response: 'unknown'});
                return;
            }

            const room = req.body.roomId;
            const existingRoom = await Rooms.findOne({_id: new ObjectId(room)});
            if(!existingRoom) {
                res.status(400).json({success: false, response: 'unknown'});
                return;
            }

            if(existingRoom.status === 'private') {
                if(existingRoom.creator !== token.user
                && existingRoom.users.find((u: string) => u !== token.user)) {
                    res.status(400).json({success: false, response: 'denied'});
                    return;
                }
            }

            const messageInsert = await Messages.insertOne({
                room: existingRoom._id,
                message: message,
                author: existingToken.user,
                createdAt: Date()
            });

            existingRoom.messages.push(messageInsert.insertedId);
            const roomReplace = await Rooms.replaceOne({_id: new ObjectId(existingRoom._id)}, existingRoom);

            res.status(200).json({
                success: true,
                response: 'success',
                messageId: messageInsert.insertedId
            });
        } catch(error) {
            res.status(500).json({success: false, response: 'error'});
            console.error('Error on route ' + route, error);
        }
    });
}


export const setMessags = (router: Router, database: Db, route: string) => {
    setMessagsGet(router, database, route + '/get');
    setMessagsGetlist(router, database, route + '/getlist');
    setMessagsPost(router, database, route + '/post');
}

