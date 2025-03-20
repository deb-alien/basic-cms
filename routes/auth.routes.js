import { Router } from "express";
import { getProfile, login, logout } from "../controllers/auth.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/login', login);
router.get('/logout', logout);
router.get('/profile', verifyJwt, getProfile);


export default router;