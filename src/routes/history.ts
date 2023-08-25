import { Router } from "express";
import { NewHistoryCtrl } from '../controllers/history.controller';
import multerMiddleware from "../middlewares/history";
import { Protected } from "../middlewares/jwt";

const router = Router();

router.post('/new', Protected, multerMiddleware.single('file'), NewHistoryCtrl);

export { router };
