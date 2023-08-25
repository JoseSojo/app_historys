import { Response } from "express";
import { RequestExtended } from "../interfaces/app.interface";
import { handleErrorHttp } from "../utils/errors.util";
import { File, History } from "../interfaces/history.interface";
import { 
    ServiceCreateHistory, 
    ServiceHistoryUsername, 
    ServiceHistoryTags, 
    ServiceGetHistories 
} from "../services/history.service";

/**
 * 
 * @param req object request express
 * @param res object response express
 * @returns res.status.json
 */
const GetHistoriesCtrl = async (req:RequestExtended, res:Response) => {
    try {
        const responseService = await ServiceGetHistories(parseInt(req.params.skip));

        return res
            .status(200)
            .json({ response:'AH_SUCCESS_GET_HISTORYES', body:responseService });
    } catch (error) {
        handleErrorHttp(res, 500, 'AH_ERR_GET_HISTORYES', error);
    }
}

/**
 * 
 * @param req object request express
 * @param res object response express
 * @returns res.status.json
 */
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
            content: body.content,
            tags: body.tags
        }

        const responseService = await ServiceCreateHistory(createFile, createHistory);

        return res
            .status(200)
            .json({ response:'AH_SUCCESS_HISTORY_CREATE', body:responseService });
        
    } catch (error) {
        handleErrorHttp(res, 500, 'AH_ERR_HISTORY_NEW', error);
    }
}

/**
 * @param req object request express
 * @param res object response express
 * @returns res.status.json
 */
const GetHistoriesUsernameCtrl = async (req: RequestExtended, res: Response) => {
    try {
        const { username } = req.params;
        const responseService = await ServiceHistoryUsername(username);

        return res
            .status(200)
            .json({ response:'AH_SUCCESS_GET_HISTORY_BY_USERNAME', body:responseService });
    } catch (error) {
        handleErrorHttp(res, 500, 'AH_ERR_GET_HISTORIES_USERNAME', error);
    }
}

/**
 * @param req object request express
 * @param res object response express
 * @returns res.status.json
 */
const HistoryTagsCtrl = async (req:RequestExtended, res:Response) => {
    try {
        const responseService = await ServiceHistoryTags(req.params.tags);

        console.log(req.params.tags)
        return res
            .status(200)
            .json({ response:'AH_SUCCESS_GET_HISTORY_BY_TAGS', body:responseService, tag:req.params.tags })
    } catch (error) {
        console.log(error);
        handleErrorHttp(res, 500, 'AH_ERR_GET_HISTORY_BY_TAGS', error);
    }
}

export { NewHistoryCtrl, GetHistoriesUsernameCtrl, HistoryTagsCtrl, GetHistoriesCtrl }