import { File, History } from "../interfaces/history.interface";
import { PrismaClient } from "@prisma/client";

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
            tags: '',
            content: history.content
        }
    });

    console.log(resultHistory, 'test 2');
    return resultHistory
}


export { ServiceCreateHistory }
