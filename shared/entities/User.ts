import { DatabaseObject } from "../models/DatabaseObject";
import { Id } from "../types/Id";

export class User extends DatabaseObject {
    name: string;
    rooms: Id[];

    constructor() {
        super();
    }
}