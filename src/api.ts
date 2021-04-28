import { Router } from 'express';
import { Db } from 'mongodb';
import { setMessags } from './api/messages';
import { setRooms } from './api/rooms';
import { setUsers } from './api/users';


export const api = async (database: Db) => {
    const router = Router();

    setUsers(router, database, '/users');
    setRooms(router, database, '/rooms');
    setMessags(router, database, '/messages');

    return router;
}
