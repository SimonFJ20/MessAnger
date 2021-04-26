import { Router } from "express";
import { Db, ObjectId } from "mongodb";
import { either, exists } from "../utils";
import bcrypt from 'bcrypt';

const setRoomsGetall = (router: Router, database: Db, route: string) => {
    router.get(route, async (req, res) => {
        try {
            const Rooms = database.collection('rooms');
            const SpecialTokens = database.collection('specialTokens');

            const types = either(req.body.types, ['public']);

            const specialToken = either(req.body.specialToken, null);
            
            const existingSpcToken = specialToken ? await SpecialTokens.findOne({token: specialToken}) : null;

            const rooms: object[] = [];

            for(let i in types) {
                if(types[i] !== 'public' && !existingSpcToken) {
                    res.status(400).json({status: false, response: 'denied'});
                    return;
                }
                const roomsCursor = await Rooms.find({status: types[i]});
                await roomsCursor.forEach(room => rooms.push(room));
            }

            res.status(200).json({
                success: true,
                response: 'success',
                rooms: rooms
            });
        } catch(error) {
            res.status(500).json({success: false, status: 'error'});
            console.error('Error on route ' + route, error);
        }
    });
}

const setRoomsGet = (router: Router, database: Db, route: string) => {
    router.get(route, async (req, res) => {
        try {
            const Rooms = database.collection('rooms');
            const Tokens = database.collection('tokens');

            if(!exists(req.body.room)) {
                res.status(400).json({success: false, response: 'incomplete'});
                return;
            }

            const roomId = req.body.room;

            const room = await Rooms.findOne({_id: new ObjectId(roomId)});

            const password = either(req.body.password, null);
            const token = either(req.body.token, null);

            if(!room) {
                res.status(400).json({success: false, response: 'unknown'});
                return;
            }

            if(room.status === 'private' && !bcrypt.compare(password, room.password)) {
                if(token) {
                    const existingToken = await Tokens.findOne({token: token});
                    let allowed = false;
                    if(existingToken) {
                        for(let i in room.users) if(existingToken._id === room.users[i]) allowed = false;
                        if(existingToken._id === room.creator) allowed = false;
                    }
                    if(!allowed) {
                        res.status(400).json({success: false, response: 'denied'});
                        return;
                    }
                } else {
                    res.status(400).json({success: false, response: 'denied'});
                    return;
                }
            }

            res.status(200).json({
                success: true,
                response: 'success',
                ...room
            });
        } catch(error) {
            res.status(500).json({success: false, status: 'error'});
            console.error('Error on route ' + route, error);
        }
    });
}

const setRoomsSearch = (router: Router, database: Db, route: string) => {
    router.get(route, async (req, res) => {
        try {
            const Rooms = database.collection('rooms');

            const search = either(req.body.search, '');
            const amount = either(req.body.amount, null);

            const roomsCursor = Rooms.find({$text: {$search: '\"' + search + '\"'}})
            .sort({score: {$meta: "textScore"}}).project({_id: 1});

            if(amount && typeof(amount) === 'number') roomsCursor.limit(amount);

            if(await roomsCursor.count() === 0) {
                res.status(200).json({
                    success: true,
                    response: 'no result',
                    rooms: []
                });
                return;
            } 

            const rooms: string[] = [];
            await roomsCursor.forEach(room => rooms.push(room._id));

            res.status(200).json({
                success: true,
                response: 'success',
                rooms: rooms
            });
        } catch(error) {
            res.status(500).json({success: false, status: 'error'});
            console.error('Error on route ' + route, error);
        }
    });
}

const setRoomsGetconstrained = (router: Router, database: Db, route: string) => {
    router.get(route, async (req, res) => {
        try {
            
        } catch(error) {
            res.status(500).json({success: false, status: 'error'});
            console.error('Error on route ' + route, error);
        }
    });
}

const setRoomsGetuser = (router: Router, database: Db, route: string) => {
    router.get(route, async (req, res) => {
        try {
            
        } catch(error) {
            res.status(500).json({success: false, status: 'error'});
            console.error('Error on route ' + route, error);
        }
    });
}

const setRoomsGetlist = (router: Router, database: Db, route: string) => {
    router.get(route, async (req, res) => {
        try {
            
        } catch(error) {
            res.status(500).json({success: false, status: 'error'});
            console.error('Error on route ' + route, error);
        }
    });
}

const setRoomsCreate = (router: Router, database: Db, route: string) => {
    router.post(route, async (req, res) => {
        try {
            
        } catch(error) {
            res.status(500).json({success: false, status: 'error'});
            console.error('Error on route ' + route, error);
        }
    });
}

const setRoomsJoin = (router: Router, database: Db, route: string) => {
    router.post(route, async (req, res) => {
        try {
            
        } catch(error) {
            res.status(500).json({success: false, status: 'error'});
            console.error('Error on route /rooms/join', error);
        }
    });
}



export const setRooms = (router: Router, database: Db, route: string) => {
    setRoomsGetall(router, database, route + '/getall');
    setRoomsGet(router, database, route + '/get');
    setRoomsSearch(router, database, route + '/search');
    setRoomsGetconstrained(router, database, route + '/getconstrained');
    setRoomsGetuser(router, database, route + '/getuser');
    setRoomsGetlist(router, database, route + '/getlist');
    setRoomsCreate(router, database, route + '/create');
    setRoomsJoin(router, database, route + '/join');
}
