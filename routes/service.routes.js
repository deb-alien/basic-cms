import { Router } from "express";
import { adminPrivilegeRequired, verifyJwt } from "../middlewares/auth.middleware.js";
import { getAllServices, createService, getService, updateService, deleteService } from "../controllers/service.controller.js";
import { upload } from "../config/app.config.js";

const router = Router()

router.get('/all', getAllServices)
router.get('/:id', getService)

router.post('/', verifyJwt, adminPrivilegeRequired, upload.single('service-img'), createService)
router.put('/:id', verifyJwt, adminPrivilegeRequired, upload.single('service-img'), updateService)
router.delete('/:id', verifyJwt, adminPrivilegeRequired, deleteService)


export default router;

