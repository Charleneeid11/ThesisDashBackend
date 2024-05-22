import fileModel from "../models/file"
import type { Request, Response } from "express"
import multer, { FileFilterCallback } from "multer"

//Define storage for the uploaded files
const storage = multer.diskStorage({
    destination: (req: Request, file, cb) => {
        cb(null, 'uploads/') //Set the destination folder
    },
    filename: (req: Request, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`) //Set the file name
    }
})

//Check file extension
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.originalname.endsWith('.java') || file.originalname.endsWith('.py')) {
        cb(null, true)
    } else {
        cb(new Error('Only .java and .py files are allowed!') as unknown as null, false)
    }
}

//Initialize multer with the storage settings and filter for file types
const upload = multer({ storage: storage, fileFilter: fileFilter })

const uploadFiles = async (req: Request, res: Response): Promise<any> => {
    try {
        const files = req.files as Express.Multer.File[];
        const savedFiles = await Promise.all(files.map(async file => {
            const newFile = new fileModel({ fid: 123, name: file.originalname, size: file.size })
            return await newFile.save()
        }))
        return res.status(201).json({ message: 'Files have been successfully uploaded.', files: savedFiles })
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while attempting to upload files.' })
    }
}

export default {
    upload,
    uploadFiles,
    storage,
    fileFilter
}