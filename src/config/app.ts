import express, { Request, Response } from "express";
import errorHandler from "../adapters/http/middleware/errorHandler";

const app = express();
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});
app.use(errorHandler);

export default app;
