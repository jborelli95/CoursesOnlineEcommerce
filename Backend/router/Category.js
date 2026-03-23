import express from 'express';
import { Router } from 'express';
import auth from '../services/auth.js';
import multiparty from 'connect-multiparty';
import CategoryController from '../controllers/CategoryController.js';

var path = multiparty({uploadDir : './uploads/category'});

const router = express.Router();

router.post("/register", [auth.verifyAdmin, path], CategoryController.register);
router.post("/update", [auth.verifyAdmin, path], CategoryController.register);
router.get("/list", [auth.verifyAdmin], CategoryController.list);
router.delete("/remove/:id", [auth.verifyAdmin], CategoryController.remove);