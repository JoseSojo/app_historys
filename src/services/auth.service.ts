import { UserBasic } from '../interfaces/user.interface';
import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

/**
 * 
 * @param data Data of user
 * @returns new Error() in case of ex | { user, token }
 */
const ServiceLogin = async (data:UserBasic) => {
    const prisma = await new PrismaClient();


    const found = await prisma.users.findFirst({
        where: {
            email: data.email
        }
    });

    if (!found) throw new Error('ERR_VERIFY_DATA_USER');

    const hash = await bcrypt.compare(data.password, found.password);
    if(!hash) throw new Error('ERR_VERIFY_DATA_PASSWORD');

    const token = await jwt.sign(
        { user:found },
        'HISTORY_APP',
        {
            expiresIn: '2 days'
        }
    );

    return { user: found, token };  
}

/**
 * 
 * @param save user to dave
 * @returns new Error() in case of ex | { result } -> user insert
 */
const ServiceRegister = async (save:UserBasic) => {
    // valid if exits username (save.username)
    if (save.username === null || save.username === undefined) return false;
    const prisma = await new PrismaClient();

    const found = await prisma.users.findFirst({
        where: {
            email: save.email
        }
    });

    // valid of exits user by email (save.email)
    if (found) throw new Error('ERR_USER_EXITS'); 

    save.password = await bcrypt.hash(save.password, 9);
    console.log(save);

    const result = await prisma.users.create({ 
        data:{ 
            email: save.email,
            password: save.password,
            username: save.username,
            countHistorys: 0
        }
    });

    return result;
}

export { ServiceLogin, ServiceRegister }