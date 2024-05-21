import type { File } from "../interfaces/File"
import mongoose, { Schema, model } from "mongoose"

const fileSchema = new Schema<File> (
    {
        fid: { type: mongoose.Schema.Types.ObjectId, required: true },
        name: { type: String, required: true },
        size: { type: Number },
    }
)

const fileModel = model( 'File', fileSchema )

export default fileModel;