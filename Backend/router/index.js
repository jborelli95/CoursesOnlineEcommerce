import express from 'express'
import User from './User.js'

//http://localhost:3000/api
const router = express.Router();

//http://localhost:3000/api/users
router.use('/users', User);

export default router;