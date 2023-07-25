import { Router } from "express";
import { SessionController } from "../controllers/sessions.controller";

const SessionController = new SessionController();
export const SessionRouter = Router();
SessionRouter.post("/", SessionController.create);
export {SessionRouter}