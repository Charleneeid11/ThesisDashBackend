import type { Request, Response } from "express"
import fileModel from "../models/file"

const getFileName = async (req: Request, res: Response): Promise<any> => {
    try {
        const id = req.params.id
        const file = await fileModel.findById(id)
        if (!file) {
            return res.status(404).json({ error: 'File not found.' })
        }
        res.status(200).json({ filename: file.name})
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while attempting to get the file\'s name.' })
    }
}

export default {
    getFileName
}