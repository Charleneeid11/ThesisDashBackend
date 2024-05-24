import express from "express"
import type { Router } from "express"
import fileController from "../controllers/file"

const router: Router = express.Router()

router.get('/:id', fileController.getFileName)

export default router