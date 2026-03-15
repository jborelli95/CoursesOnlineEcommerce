import express from 'express';
import { Router } from 'express';
import userController from '../controllers/UserController.js';
import auth from '../services/auth.js';
import multiparty from 'connect-multiparty';

var path = multiparty({uploadDir : './uploads/users'});

const router = express.Router();

// http://localhost:3000/api/users/register
router.post("/register", userController.register);

// http://localhost:3000/api/users/login
router.post("/login", userController.login);

// http://localhost:3000/api/users/login_admin
router.post("/login_admin", userController.login_admin);

//CRUD admin
router.post("/register_admin", path ,userController.register_admin);
router.post("/update", path, userController.update);
router.get('/list', userController.list);
router.delete('/delete/:id', userController.remove);

router.get("/user-image/:img", userController.get_image);

export default router;