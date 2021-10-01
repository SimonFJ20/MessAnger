import { Id } from "../types/Id";

const generateUUID = (length: number = 32): Id => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = '';
    for (let i = 0; i < length; ++i)
        result += chars.charAt(Math.floor(Math.random()*chars.length));
    return result;
}

export abstract class DatabaseObject {
    id: Id;
    createdAt: number;

    constructor() {
        this.id = generateUUID();
        this.createdAt = Date.now();
    }
}