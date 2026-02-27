import express from 'express'
import { Router } from 'express'
import userController from '../controllers/UserController.js';
import auth from '../services/auth.js'

const router = express.Router();

// http://localhost:3000/api/users/register
router.post("/register", userController.register);

router.post("/login", userController.login)

export default router;