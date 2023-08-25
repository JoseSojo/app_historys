import { Response } from "express";
import { RequestExtended } from "../interfaces/app.interface";
import { handleErrorHttp } from "../utils/errors.util";
import { File, History } from "../interfaces/history.interface";
import { ServiceCreateHistory } from "../services/history.service";

const NewHistoryCtrl = async (req:RequestExtended, res:Response) => {
    try {
        const {body, file, user} = req;
        const createFile:File = {
            name:`${file?.filename}`,
            size:`${file?.size}`,
            url:`${file?.path}`,
            type:`${file?.originalname.split('.').pop()}`
        }
        const createHistory:History = {
            createBy: user.user.userId,
            content: body.content
        }

        const responseService = await ServiceCreateHistory(createFile, createHistory);

        return res
            .status(200)
            .json({ response:'AH_SUCCESS_HISTORY_CREATE', body:responseService });
        
    } catch (error) {
        handleErrorHttp(res, 500, 'AH_ERR_HISTORY_NEW', error);
    }
}

export { NewHistoryCtrl }