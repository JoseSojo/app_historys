import {
    ServiceLogin,
    ServiceRegister
} from "../services/auth.service";
import { Request, Response } from "express";
import { handleErrorHttp } from "../utils/errors.util";
import { UserBasic } from "../interfaces/user.interface";

const LoginCtrl = async (req:Request, res:Response) => {
    try {
        const checkLogin:UserBasic = {
            email: req.body.email,
            password: req.body.password
        }
        const responseService = await ServiceLogin(checkLogin);

        return res
            .status(200)
            .cookie('token', responseService.token)
            .json({ response:'AH_SUCCESS_LOGIN', body:responseService.user });
    } catch (error) {
        handleErrorHttp(res, 500, 'AH_ERR_LOGIN', error);
    }
}

const RegisterCtrl = async (req:Request, res:Response) => {
    try {
        if (req.body.username === null || req.body.username === undefined) throw new Error('AH_ERROR_USERNAME_INVALID');
        const checkRegister:UserBasic = {
            email: req.body.email,
            password: req.body.password,
            username: req.body.username
        }
        const responseService = await ServiceRegister(checkRegister);

        return res
            .status(200)
            .json({ response:'AH_SUCCESS_LOGIN', body:responseService });
    } catch (error) {
        handleErrorHttp(res, 500, 'AH_ERR_LOGIN', error);
    }
}

export { LoginCtrl, RegisterCtrl };
