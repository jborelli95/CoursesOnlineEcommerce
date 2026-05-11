import express from 'express';
import auth from '../services/auth.js';
import CouponController from '../controllers/CouponController.js';

const router = express.Router();

router.get("/config_all",  [auth.verifyAdmin], CouponController.config_all);
router.post("/register", [auth.verifyAdmin], CouponController.register);
router.post("/update",   [auth.verifyAdmin], CouponController.update);
router.get("/list",      [auth.verifyAdmin], CouponController.list);
router.delete("/remove/:id", [auth.verifyAdmin], CouponController.remove);
router.get("/show/:id",       [auth.verifyAdmin], CouponController.show);
router.get("/validate/:code", CouponController.validate);

export default router;
