import express from 'express'
import { Router } from 'express'
import userController from '../controllers/UserController.js';
import auth from '../services/auth.js'

const router = express.Router();

// http://localhost:3000/api/users/register
router.post("/register", userController.register);

// http://localhost:3000/api/users/login
router.post("/login", userController.login);

// http://localhost:3000/api/users/login_admin
router.post("/login_admin", userController.login_admin);

export default router;