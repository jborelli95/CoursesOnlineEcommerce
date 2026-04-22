import express from 'express';
import auth from '../services/auth.js';
import CourseClassController from '../controllers/CourseClassController.js';
import multiparty from 'connect-multiparty';

const router = express.Router();

let path = multiparty();

//http://localhost:3000/api/course/class/register
router.post("/register", [auth.verifyAdmin], CourseClassController.register);
//http://localhost:3000/api/course/class/update
router.post("/update", [auth.verifyAdmin], CourseClassController.update);
//http://localhost:3000/api/course/class/list
router.get("/list", [auth.verifyAdmin], CourseClassController.list);
//http://localhost:3000/api/course/class/remove/:id
router.delete("/remove/:id", [auth.verifyAdmin], CourseClassController.remove);
//http://localhost:3000/api/course/class/upload_vimeo
router.post('/upload/vimeo', [auth.verifyAdmin, path], CourseClassController.uploadVimeo)

export default router;