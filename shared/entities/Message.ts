import { DatabaseObject } from "../models/DatabaseObject";
import { Id } from "../types/Id";

export class Message extends DatabaseObject {
    userId: Id;
    roomId: Id;
    content: string;

    constructor() {
        super();
    }
}