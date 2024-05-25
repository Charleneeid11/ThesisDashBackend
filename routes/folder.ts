import express from 'express'
import folderController from '../controllers/folder'

const router = express.Router()

router.post('/create', folderController.upload.array('files', 10), folderController.create)
router.get('/', folderController.getFolders)
router.patch('/:id', folderController.editFolder)
router.get('/:id', folderController.viewFolder)
router.delete('/:id', folderController.deleteFolder)

export default router

