import mongoose from "mongoose"
import type { Request, Response } from "express"
import folderModel from "../models/folder"
import fileModel from "../models/file"
import multer, { FileFilterCallback } from "multer"

const storage = multer.diskStorage({
    destination: (req: Request, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req: Request, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.originalname.endsWith('.java') || file.originalname.endsWith('.py')) {
        cb(null, true)
    } else {
        cb(new Error('Only .java and .py files are allowed!') as unknown as null, false)
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter })

const create = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, crsnum } = req.body as { name: string, crsnum: string }
        const dupfolder = await folderModel.findOne({ name })
        if (dupfolder) {
            return res.status(409).json({ error: 'A folder with this name already exists.' })
        }
        const files = req.files as Express.Multer.File[]
        const fileIds = await Promise.all(files.map(async file => {
            const newFile = new fileModel({ name: file.originalname, size: file.size })
            const savedFile = await newFile.save()
            return savedFile._id
        }))
        const newFolder = new folderModel({ name, files: fileIds, crsnum })
        await newFolder.save()
        return res.status(201).json({ message: 'New code folder has been successfully created.', folder: newFolder })
    } catch (error) {
        console.error("error:\n", error);
        return res.status(500).json({ error: 'An error occurred while attempting to create a new code folder.' })
    }
}

const getFolders = async (req: Request, res: Response): Promise<any> => {
    try {
        const folders = await folderModel.find()
        return res.status(200).json(folders)
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while attempting to fetch all folders.' })
    }
}

//edit

//view

const deleteFolder = async (req: Request, res: Response): Promise<any> => {
    try {
        const fid = req.params.id
        if (!mongoose.Types.ObjectId.isValid(fid)) {
            return res.status(400).json({ error: 'Invalid folder ID.' })
        }
        const folder = await folderModel.findById(fid)
        if (!folder) {
            return res.status(404).json({ error: 'Folder not found.' })
        }
        await folderModel.findByIdAndDelete(fid)
        return res.status(200).json({ message: 'Folder successfully deleted.' })
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while attempting to delete folder.' })
    }
}

export default {
    create,
    getFolders,
    upload,
    deleteFolder
}