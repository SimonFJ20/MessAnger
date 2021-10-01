import type { DatabaseObject } from "../models/DatabaseObject";
import type { Permission } from "../types/Permission";

export interface RoomUser extends DatabaseObject {
    name: string;
    permission: Permission;
}