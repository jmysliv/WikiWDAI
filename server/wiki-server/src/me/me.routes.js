import { validJWTNeeded } from '../auth/validation.middleware'
import express from 'express';
import { getUserByToken } from './me.controller';
var router = express.Router();

router.get('/', [
        validJWTNeeded,
        getUserByToken
    ]);

export default router;

