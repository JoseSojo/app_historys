import { Router } from "express";
import { readdirSync } from 'fs';

const PATH_NAME = `${__dirname}`;
const router = Router();

/**
 * 
 * @param fileName => nombre a limpiar (quitar extension del archivo)
 */
const cleanFileName = (fileName:string) => {
    return fileName.split('.').shift();
}

readdirSync(PATH_NAME).filter((fileName) => {
    const cleanName = cleanFileName(fileName);
    if(cleanName !== 'index') {
        import(`./${cleanName}`)
            .then((moduleRouter) => {
                // console.log('Cargando Rutas...', moduleRouter);
                router.use(`/${cleanName}`, moduleRouter.router);
            });
    }
})

export { router };
