import mongoose from "mongoose"
import type { Request, Response } from "express"
import folderModel from "../models/folder"

const create = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, files, crsnum } = req.body as { name: string, files: mongoose.Schema.Types.ObjectId[], crsnum: string }
        const dupfolder = await folderModel.find({ name })
        console.log("dupfolder", dupfolder)
        // if (dupfolder) {
        //     console.log("2")
        //     return res.status(409).json({ error: 'A folder with this name already exists.' })
        // }
        console.log("3")
        const newfolder = new folderModel ({ name, files, crsnum })
        console.log("4")
        console.log(newfolder)
        await newfolder.save()
        return res.status(201).json({ message: 'New code folder has been successfully created.' })
    } catch (error) {
        console.log("error:\n", error)
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
        const fid = req.params
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
    deleteFolder
}