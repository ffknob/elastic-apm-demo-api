import express from 'express';

import { requestParser, requestLimit, requestProxy } from '../middlewares';

const router = express.Router();

router.use(requestParser, requestLimit, requestProxy);

export default router;
