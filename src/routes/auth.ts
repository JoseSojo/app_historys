import { Router } from "express";
import { LoginCtrl, RegisterCtrl } from "../controllers/auth.controller";

const router = Router();

router.post('/login', LoginCtrl);

router.post('/register', RegisterCtrl)

export { router };