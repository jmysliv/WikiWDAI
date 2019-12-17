import express from 'express';
import {insert, insertUser, userGetById, userGet, userPut, userDelete} from '../controllers/user.controller'
import { validJWTNeeded } from '../auth/validation.middleware';
import { checkIfAdmin } from '../auth/verify.user.middleware';
var router = express.Router();


//handling get, post and delete request
router.get('/',  [userGet]);

router.post('/', insertUser);

//handling request with specified id(get, put, delete)
router.get('/:userId', [userGetById]);

router.put('/:userId', [validJWTNeeded, checkIfAdmin, userPut]);

router.delete('/:userId', [validJWTNeeded, checkIfAdmin, userDelete]);

export default router;