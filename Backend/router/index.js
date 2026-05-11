import express from 'express'
import User from './User.js'
import Category from './Category.js'
import Course from './Course.js'
import CourseSection from './CourseSection.js'
import CourseClass from './CourseClass.js'
import CourseClassFile from './CourseClassFile.js'
import Coupon from './Coupon.js'

//http://localhost:3000/api
const router = express.Router();

//http://localhost:3000/api/users
router.use('/users', User);

//http://localhost:3000/api/categories
router.use('/categories', Category);

//http://localhost:3000/api/courses
router.use('/courses', Course);

////http://localhost:3000/api/course_section
router.use('/course_section', CourseSection);

///http://localhost:3000/api/course/class/file
router.use('/course/class/file', CourseClassFile);

///http://localhost:3000/api/course/class
router.use('/course/class', CourseClass);

///http://localhost:3000/api/coupons
router.use('/coupons', Coupon);

export default router;