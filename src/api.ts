import { Router } from 'express';
import { Db } from 'mongodb';
import { setMessags } from './api/messages';
import { setRooms } from './api/rooms';
import { setUsers } from './api/users';
import { exists } from './utils';


export const api = async (database: Db) => {
    const router = Router();

    const Users = database.collection('users');
    const Rooms = database.collection('rooms');
    const Messages = database.collection('messages');
    const Tokens = database.collection('tokens');
    const SpecialTokens = database.collection('specialTokens');

    setUsers(router, database, '/users');
    setRooms(router, database, '/rooms');
    setMessags(router, database, '/messages');


    return router;
}
