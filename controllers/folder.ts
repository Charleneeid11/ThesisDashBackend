import mongoose from "mongoose"
import type { Request, Response } from "express"
import folderModel from "../models/folder"
import fileModel from "../models/file"
import multer, { FileFilterCallback } from "multer"
import fs from "fs"
import path from "path"

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
        console.error("error:\n", error)
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

const editFolder = async (req: Request, res: Response): Promise<any> => {
    try {
        const fid = req.params.id
        if (!mongoose.Types.ObjectId.isValid(fid)) {
            return res.status(400).json({ error: 'Invalid folder ID.' })
        }
        const folder = await folderModel.findById(fid)
        if (!folder) {
            return res.status(404).json({ error: 'Folder not found.' })
        }
        const { removeFileIds } = req.body as { removeFileIds: string[] }
        if (removeFileIds && removeFileIds.length > 0) {
            for (const fileId of removeFileIds) {
                if (mongoose.Types.ObjectId.isValid(fileId)) {
                    await fileModel.findByIdAndDelete(fileId)
                }
            }
            folder.files = folder.files.filter(fileId => !removeFileIds.includes(fileId.toString()))
        }
        if (req.files) {
            const files = req.files as Express.Multer.File[]
            const newFileIds = await Promise.all(files.map(async file => {
                const newFile = new fileModel({ name: file.originalname, size: file.size })
                const savedFile = await newFile.save()
                return savedFile._id
            }))
            folder.files = folder.files.concat(newFileIds)
        }
        await folder.save()
        return res.status(200).json({ message: 'Folder successfully updated.' })
    } catch (error) {
        console.error("error:\n", error)
        return res.status(500).json({ error: 'An error occurred while attempting to edit the folder.' })
    }
}

// const viewFolder = async (req: Request, res: Response): Promise<any> => {
//     try {
//         const fid = req.params.id
//         const { fileIds } = req.body as { fileIds: string[] }
//         if (!mongoose.Types.ObjectId.isValid(fid)) {
//             return res.status(400).json({ error: 'Invalid folder ID.' })
//         }
//         const folder = await folderModel.findById(fid)
//         if (!folder) {
//             return res.status(404).json({ error: 'Folder not found.' })
//         }
//         const selectedFiles = await fileModel.find({ _id: { $in: fileIds } })
//         if (selectedFiles.length === 0) {
//             return res.status(404).json({ error: 'No files found with the provided IDs.' })
//         }
//         const zip = new require('node-zip')()
//         for (const file of selectedFiles) {
//             const filePath = path.join('uploads', file.name)
//             if (fs.existsSync(filePath)) {
//                 zip.file(file.name, fs.readFileSync(filePath))
//             }
//         }
//         const zipData = zip.generate({ base64: false, compression: 'DEFLATE' })
//         const zipName = `${folder.name}-${Date.now()}.zip`
//         const zipPath = path.join('uploads', zipName)
//         fs.writeFileSync(zipPath, zipData, 'binary')
//         res.download(zipPath, zipName, (err) => {
//             if (err) {
//                 console.error("error:\n", err);
//                 return res.status(500).json({ error: 'An error occurred while attempting to download the files.' })
//             }
//             fs.unlinkSync(zipPath)
//         })
//     } catch (error) {
//         console.error("error:\n", error)
//         return res.status(500).json({ error: 'An error occurred while attempting to view the folder.' })
//     }
// }

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
    editFolder,
    deleteFolder
}