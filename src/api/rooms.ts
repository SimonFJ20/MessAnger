import { Router } from "express";
import { Db, FilterQuery, ObjectId } from "mongodb";
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
                    res.status(400).json({success: false, response: 'denied'});
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
            res.status(500).json({success: false, response: 'error'});
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
            res.status(500).json({success: false, response: 'error'});
            console.error('Error on route ' + route, error);
        }
    });
}

const stringSortToIntSort = (string: string) => {
    if(string === 'ascending') return 1
    if(string === 'descending') return -1;
    return 1;
}

const setRoomsGetconstrained = (router: Router, database: Db, route: string) => {
    router.get(route, async (req, res) => {
        try {
            const Rooms = database.collection('rooms');
            
            if(!exists(req.body.amount)) {
                res.status(400).json({success: false, response: 'incomplete'});
                return;
            }
            
            const sortBy = either(req.body.sortBy, 'default');
            const sortType = either(req.body.sortType, 'default');
            
            const amount = req.body.amount;
            
            const name = either(req.body.name, null);
            const description = either(req.body.description, null);
            const creator = either(req.body.creator, null);
            const userCount = either(req.body.userCount, null);
            const messageCount = either(req.body.messageCount, null);
            const createdBefore = either(req.body.createdBefore, null);
            const createdAfter = either(req.body.createdAfter, null);
            
            const query: FilterQuery<any> = {};
            
            if(name) query['name'] = name;
            if(description) query['description'] = description;
            if(creator) query['creator'] = creator;
            if(userCount) query['users'] = {$size: userCount};
            if(messageCount) query['messages'] = {$size: messageCount};
            query['createdAt'] = {};
            if(createdBefore) query['createdAt']['$lte'] = new Date(createdBefore);
            if(createdAfter) query['createdAt']['$gte'] = new Date(createdAfter);
            
            const roomsCursor = Rooms.find(query).project({_id: 1});
            
            switch(sortBy) {
                case 'userCount':
                    roomsCursor.sort({userCount: stringSortToIntSort(sortType)});
                    return;
                case 'messageCount':
                    roomsCursor.sort({message: stringSortToIntSort(sortType)});
                    return;
                case 'date':
                    roomsCursor.sort({createdAt: stringSortToIntSort(sortType)});
                    return;
            }
            
            roomsCursor.limit(amount);
            
            const rooms: string[] = [];
            await roomsCursor.forEach(room => rooms.push(room));
            
            if(rooms.length === 0) {
                res.status(200).json({success: true, response: 'no result'});
                return;
            }
            
            res.status(200).json({
                success: true,
                response: 'success',
                rooms: rooms
            });
        } catch(error) {
            res.status(500).json({success: false, response: 'error'});
            console.error('Error on route ' + route, error);
        }
    });
}

const setRoomsGetuser = (router: Router, database: Db, route: string) => {
    router.get(route, async (req, res) => {
        try {
            const Rooms = database.collection('rooms');
            const Tokens = database.collection('tokens');
            
            if(!exists(req.body.tokens)) {
                res.status(400).json({success: false, response: 'incomplete'});
                return;
            }
            
            const token = req.body.token;
            const relation = either(req.body.relation, []);
            const types = either(req.body.types, []);
            
            const existingToken = await Tokens.findOne({token: token});
            if(!existingToken) {
                res.status(400).json({success: false, response: 'unknown'});
                return;
            }
            
            if(relation.length < 2 || types.length < 3) {
                res.status(400).json({success: false, response: 'incomplete'});
                return;
            }
            
            const query: FilterQuery<any> = {$and: [{$or: []}, {$or: []}]};
            
            for(let i in relation) query.$and![0].$or!.push(relation[i]);
            for(let i in types) query.$and![1].$or!.push(relation[i]);
            
            const roomsCursor = await Rooms.find(query).project({_id: 1});
            
            const rooms: string[] = [];
            await roomsCursor.forEach(room => rooms.push(room._id));
            
            res.status(200).json({
                success: true,
                response: 'success',
                rooms: rooms
            });
        } catch(error) {
            res.status(500).json({success: false, response: 'error'});
            console.error('Error on route ' + route, error);
        }
    });
}

const setRoomsGetlist = (router: Router, database: Db, route: string) => {
    router.get(route, async (req, res) => {
        try {
            const Rooms = database.collection('rooms');
            const Tokens = database.collection('tokens');
            const SpecialTokens = database.collection('specialTokens');
            
            if(!exists(req.body.rooms) || typeof(req.body.rooms) === 'object') {
                res.status(400).json({success: false, response: 'incomplete'});
                return;
            }
            
            let validToken = false;
            let tokenUser = '';
            const token = either(req.body.token, null);
            const existingToken = await Tokens.findOne({token: token});
            if(existingToken) {
                validToken = true;
                tokenUser = existingToken.user;
            }
            
            let validSpcToken = false;
            const specialToken = either(req.body.specialToken, null);
            const existingSpcToken = await SpecialTokens.findOne({token: specialToken});
            if(existingSpcToken) validSpcToken = true;
            
            const roomIdList = req.body.rooms as string[];
            const roomObjectIdList = roomIdList.map(roomId => new ObjectId(roomId));

            const roomsCursor = Rooms.find({
                _id: {$in: roomObjectIdList},
                $or: [
                    {status: {$not: 'private'}},
                    {creator: tokenUser},
                    {users: {$in: [tokenUser]}}
                ]
            });

            const rooms: any[] = [];
            await roomsCursor.forEach((room) => {
                if(room.status !== 'private') rooms.push(room);
                else if(validSpcToken) rooms.push(room);
                else if(validToken) rooms.push(room);
            });
            
            res.status(200).json({
                success: true,
                response: 'success',
                rooms: rooms
            });
        } catch(error) {
            res.status(500).json({success: false, response: 'error'});
            console.error('Error on route ' + route, error);
        }
    });
}

const setRoomsCreate = (router: Router, database: Db, route: string) => {
    router.post(route, async (req, res) => {
        try {
            const Users = database.collection('users');
            const Rooms = database.collection('rooms');
            const Tokens = database.collection('tokens');

            if(!exists(req.body.token, req.body.name, req.body.description, req.body.status, req.body.password)) {
                res.status(400).json({success: false, response: 'incomplete'});
                return;
            }

        } catch(error) {
            res.status(500).json({success: false, response: 'error'});
            console.error('Error on route ' + route, error);
        }
    });
}

const setRoomsJoin = (router: Router, database: Db, route: string) => {
    router.post(route, async (req, res) => {
        try {
            
        } catch(error) {
            res.status(500).json({success: false, response: 'error'});
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
