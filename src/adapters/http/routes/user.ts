import { Router, NextFunction, Request, Response } from "express";
import { UserController } from "../controllers/user";

const router = Router();
const userController = new UserController();

function asyncHandler(fn: Function) {
  return (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
}

router.post(
  "/auth/signup",
  asyncHandler((req: Request, res: Response, next: NextFunction) =>
    userController.createUser(req, res, next),
  ),
);

export default router;
