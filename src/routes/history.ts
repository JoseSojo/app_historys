import { Router } from "express";
import { 
    NewHistoryCtrl, 
    GetHistoriesUsernameCtrl, 
    HistoryTagsCtrl,
    GetHistoriesCtrl
} from '../controllers/history.controller';
import multerMiddleware from "../middlewares/history";
import { Protected } from "../middlewares/jwt";

const router = Router();

// Get histories
router.get('/home/:skip', Protected, GetHistoriesCtrl);

// Create History
router.post('/new', Protected, multerMiddleware.single('file'), NewHistoryCtrl);

// Search by username
router.get('/search/:username', Protected, GetHistoriesUsernameCtrl);

// Search by tags
router.get('/search/tags/:tags', Protected, HistoryTagsCtrl);

export { router };
