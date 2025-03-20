import { Router } from "express";
import { adminPrivilegeRequired, verifyJwt } from "../middlewares/auth.middleware.js";
import { getAllTeams, createTeam, getTeam, updateTeam, deleteTeam } from '../controllers/team.controller.js';
import { upload } from "../config/app.config.js";

const router = Router();

router.get('/all', getAllTeams)
router.get('/:id', getTeam)

router.post('/', verifyJwt, adminPrivilegeRequired, upload.single('team-img'), createTeam)
router.put('/:id', verifyJwt, adminPrivilegeRequired, upload.single('team-img'), updateTeam)
router.delete('/:id', verifyJwt, adminPrivilegeRequired, deleteTeam)

export default router;