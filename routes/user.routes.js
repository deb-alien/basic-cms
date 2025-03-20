import { Router } from "express";
import { createUser, deleteUser, updateUser } from "../controllers/user.controller.js";
import { adminPrivilegeRequired, verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/create-user', verifyJwt, adminPrivilegeRequired, createUser)
router.put('/update-user/:id', verifyJwt, adminPrivilegeRequired, updateUser);
router.delete('/delete-user/:id', verifyJwt, adminPrivilegeRequired, deleteUser);

export default router;