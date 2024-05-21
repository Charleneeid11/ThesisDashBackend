import express from "express";
import type { Router } from "express";
import folderController from "../controllers/folder"

const router: Router = express.Router()

router.get('/', folderController.getFolders)
router.post('/', folderController.create)
router.delete('/:fid', folderController.deleteFolder)

export default router
