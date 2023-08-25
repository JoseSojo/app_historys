import { File, History } from "../interfaces/history.interface";
import { PrismaClient } from "@prisma/client";

/**
 * 
 * @param sk :number skip in database - take 3 of default
 * @returns results [{},{},{}]
 */
const ServiceGetHistories = async (sk:number) => {
    const prisma = await new PrismaClient();
    const historyWorking:any[] = [];
    const resultHistorys = await prisma.historys.findMany({
        skip:sk,
        take:3,
        include: {
            fileReference: true,
            userReference: true
        }
    });

    return resultHistorys;
}

/**
 * 
 * @param file Data of file to save
 * @param history Data of History to save
 * @returns result create history 
 */
const ServiceCreateHistory = async (file:File, history:History) => {
    const prisma = new PrismaClient();

    const resultFile = await prisma.files.create({
        data: {
            name:file.name,
            type:file.type,
            url:file.url
        }
    });
    const resultHistory = await prisma.historys.create({
        data: {
            fileId: resultFile.fileId,
            createBy: history.createBy,
            tags: history.tags,
            content: history.content
        }
    });

    console.log(resultHistory, 'test 2');
    return resultHistory
}

/**
 * 
 * @param username :string for search by username
 * @returns Array histories
 */
const ServiceHistoryUsername = async (username:string) => {
    const prisma = new PrismaClient();
    console.log(username);
    const getUser = await prisma.users.findFirst({
        where: {
            username:username
        }
    });

    const getHistories = await prisma.historys.findMany({
        where: {
            createBy: getUser?.userId
        },
        include: {
            fileReference:true
        }
    })

    return {getUser, getHistories};
}

/**
 * 
 * @param tag :string search
 * @returns :[histories, user]
 */
const ServiceHistoryTags = async (tag:string) => {
    const prisma = await new PrismaClient();
    const historyWorking:any[] = [];
    const resultHistorys = await prisma.historys.findMany({
        where: {
            tags: tag
        },
        include: {
            fileReference: true,
            userReference: true
        }
    });

    return resultHistorys;
}

export { 
    ServiceGetHistories, 
    ServiceCreateHistory, 
    ServiceHistoryUsername, 
    ServiceHistoryTags 
}
