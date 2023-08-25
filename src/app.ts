import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { router } from './routes';


const app = express();
const PORT = process.env.PORT || 3005;

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use(router);

app.listen(PORT, () => {
    console.clear();
    console.log('History App');
    console.log('Server on port', PORT);
})
