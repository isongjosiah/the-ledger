import { Session } from "inspector/promises";
import { User } from "../entities/user";
import { ClientSession } from "mongoose";

export interface IUserRepository{
  create(user: User, session?: ClientSession): Promise<User>;
  findById(id: String): Promise<User | null>;
  findByEmail(email: String): Promise<User | null>;
}
