// routes/courses.js
import express from 'express';
import { getCourses, insertCourse, getCourseByID, putCourse, deleteCourseById } from '../controllers/course.controller';
import { validJWTNeeded } from '../auth/validation.middleware';
import { checkIfAdmin } from '../auth/verify.user.middleware';
var router = express.Router();

router.get('/', getCourses);

router.post('/', [validJWTNeeded, checkIfAdmin, insertCourse]);

//handling request with specified id(get, patch, delete)
router.get('/:id', getCourseByID);

router.put('/:id', [validJWTNeeded, putCourse]);

router.delete('/:id', [validJWTNeeded, checkIfAdmin, deleteCourseById])

export default router;