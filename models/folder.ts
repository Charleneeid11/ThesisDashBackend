import type { Folder } from "../interfaces/Folder"
import mongoose, { Schema, model } from "mongoose"

const folderSchema = new Schema<Folder> (
    {
        name: { type: String, required: true },
        files: [{ type: mongoose.Schema.Types.ObjectId, required: true }],
        size: { type: Number },
        language: { type: String, enum: [ 'Python', 'Java' ] },
        crsnum: { type: String, required: true }
    }
)

const folderModel = model( 'Folder', folderSchema )

export default folderModel