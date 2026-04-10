import express from 'express';
import { Router } from 'express';
import auth from '../services/auth.js';
import CourseSectionController from '../controllers/CourseSectionController.js';


const router = express.Router();

//http://localhost:3000/api/course_section/register
router.post("/register", [auth.verifyAdmin], CourseSectionController.register);
//http://localhost:3000/api/course_section/update
router.post("/update", [auth.verifyAdmin], CourseSectionController.update);
//http://localhost:3000/api/course_section/list
router.get("/list", [auth.verifyAdmin], CourseSectionController.list);
//http://localhost:3000/api/course_section/remove/:id
router.delete("/remove/:id", [auth.verifyAdmin], CourseSectionController.remove);

export default router;