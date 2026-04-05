import express from 'express';
import auth from '../services/auth.js';
import multiparty from 'connect-multiparty';
import CourseController from '../controllers/CourseController.js';


var path = multiparty({uploadDir : './uploads/courses'});

const router = express.Router();

//http://localhost:3000/api/courses/register
router.post("/register", [auth.verifyAdmin, path], CourseController.register);
//http://localhost:3000/api/courses/update
router.post("/update", [auth.verifyAdmin, path], CourseController.update);
//http://localhost:3000/api/courses/list
router.get("/list", [auth.verifyAdmin], CourseController.list);
//http://localhost:3000/api/courses/remove/:id
router.delete("/remove/:id", [auth.verifyAdmin], CourseController.remove);
//http://localhost:3000/api/courses/image-course/:img
router.get("/image-course/:img", CourseController.getImage);
//http://localhost:3000/api/courses/image-course/:img
router.get("/config_all", [auth.verifyAdmin], CourseController.config_all);

export default router;