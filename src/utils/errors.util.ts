import { Response } from "express"

const handleErrorHttp = (res:Response, code:number, msg:string, err:any) => {
    res.status(code).json({ response:msg, body:null });
}

export { handleErrorHttp };