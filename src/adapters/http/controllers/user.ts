import { CreateUser} from "../../../application/useCases/createUser";
import { UserRepository } from "../../dal/repositories/user";
import {NextFunction, Request, Response} from "express";
import { RedisTokenRepository } from "../../infrastructure/redis/token";

const userRepo = new UserRepository()
const tokenRepo = new RedisTokenRepository()
const createUserLogic = new CreateUser(userRepo)

export class UserController{
  async createUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const user = await createUserLogic.execute(req.body)
    } catch(err: any) {
      return res.status(400).json({error: err.message})
    }
  }
}
