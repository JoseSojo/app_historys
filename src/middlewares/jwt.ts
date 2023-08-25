import jwt from 'jsonwebtoken';
import { NextFunction, Response, Request } from 'express';
import { RequestExtended } from '../interfaces/app.interface';

export const Protected = async (req:RequestExtended, res:Response, next:NextFunction) => {
    try {
        const token = req.header('token');
        console.log(token);

        if (!token) throw new Error('ERR_NOT_AUTHORIZED');

        const decoded = jwt.verify(token, 'HISTORY_APP'); // Decodificando el TOKEN
        console.log(decoded);
        req.user = decoded;
        next()

    } catch (error) {
        return res
            .status(401)
            .json({ response:'No Authorizado, inicia sesión.', body:null })
    }
}
