import express from 'express'
import User from './User.js'
import Category from './Category.js'

//http://localhost:3000/api
const router = express.Router();

//http://localhost:3000/api/users
router.use('/users', User);

//http://localhost:3000/api/categories
router.use('/categories', Category)


export default router;