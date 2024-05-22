import express, { Request, Response, NextFunction } from "express";
import type { Router } from "express";
import fileController from "../controllers/file"

const router: Router = express.Router()

router.post('/upload', (req: Request, res: Response, next: NextFunction) => {
    next()
}, fileController.upload.array('files', 10), fileController.uploadFiles)

export default router