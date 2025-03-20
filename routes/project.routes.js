import  { Router } from "express";
import { adminPrivilegeRequired, verifyJwt } from "../middlewares/auth.middleware.js";
import { getAllProjects, createProject, getProject, updateProject, deleteProject } from '../controllers/project.controller.js';
import { upload } from "../config/app.config.js";


const router = Router();

router.get('/all', getAllProjects)
router.get('/:id', getProject)

router.post('/', verifyJwt, adminPrivilegeRequired, upload.single('project-img'), createProject)
router.put('/:id', verifyJwt, adminPrivilegeRequired, upload.single('project-img'), updateProject)
router.delete('/:id', verifyJwt, adminPrivilegeRequired, deleteProject)

export default router;

