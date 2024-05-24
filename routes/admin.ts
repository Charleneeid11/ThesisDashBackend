import express from "express"
import type { Router } from "express"
import adminController from "../controllers/admin"

const router: Router = express.Router()

router.get('/', adminController.getUsers)
router.post('/', adminController.signup)
router.post('/login', adminController.login)
router.post('/refreshaccesstoken', adminController.refreshAccessToken)
router.delete('/', adminController.logout)
router.delete('/:uid', adminController.deleteAccount)

export default router
