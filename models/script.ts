import type { Script } from "../interfaces/Script"
import mongoose, { Schema, model } from "mongoose"

const scriptSchema = new Schema<Script> (
    {
        _id: { type: mongoose.Schema.Types.ObjectId, required: true },
        uid: { type: mongoose.Schema.Types.ObjectId, required: true },
        name: { type: String },
        size: { type: Number },
        language: { type: String, enum: [ 'Python', 'Java' ] },
        crsnum: { type: String, required: true }
    }
)

const scriptModel = model( 'Script', scriptSchema )

export default scriptModel;