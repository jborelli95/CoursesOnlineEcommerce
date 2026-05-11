import express from 'express';
import auth from '../services/auth.js';
import multiparty from 'connect-multiparty';
import CourseClassFileController from '../controllers/CourseClassFileController.js';

const router = express.Router();

let path = multiparty({uploadDir : './uploads/courses/classes/files'});

//http://localhost:3000/api/course/class/file/...
//http://localhost:3000/api/course/class/file/upload
router.post('/upload', [auth.verifyAdmin, path], CourseClassFileController.upload);

//http://localhost:3000/api/course/class/file/list/:class_id
router.get('/list/:class_id', [auth.verifyAdmin], CourseClassFileController.list);

//http://localhost:3000/api/course/class/file/delete/:file_id
router.delete('/delete/:file_id', [auth.verifyAdmin], CourseClassFileController.delete);

//http://localhost:3000/api/course/class/file/get/:file
router.get('/get/:file', CourseClassFileController.get_file_class);

export default router;