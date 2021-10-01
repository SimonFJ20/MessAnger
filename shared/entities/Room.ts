import { DatabaseObject } from "../models/DatabaseObject";
import type { User } from "./User";
import type { RoomUser } from "../interfaces/RoomUser";
import type { Id } from "../types/Id";
import type { Permission } from "../types/Permission";

export class Room extends DatabaseObject {
    name: string;
    users: RoomUser[];
    messages: Id[];

    constructor(name: string) {
        super();
        this.name = name;
    }

    private roomUserIndexFromId = (id: Id): number | null => {
        for (let i = 0; i < this.users.length; ++i) {
            if (this.id === id)
                return i
        }
    }

    private roomUserFromId = (id: Id): RoomUser | null => {
        return this.users[this.roomUserIndexFromId(id)];
    }

    private readonly addUser = (user: User, permission: Permission) => {
        if (this.roomUserIndexFromId(user.id)) return;
        
        const roomUser: RoomUser = {
            id: user.id,
            createdAt: user.createdAt,
            name: user.name,
            permission: permission,
        };
        
        this.users.push(roomUser);
    }
    private readonly removeUser = (id: Id) => {
        const index = this.roomUserIndexFromId(id);
        if (index)
            this.users.splice(index, 1);
    }
    private readonly setUserPermission = (id: Id, permission: Permission) => {
        const user = this.roomUserFromId(id);
        if (user)
            user.permission = permission;
    }
}
