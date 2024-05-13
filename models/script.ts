import type { Script } from "../interfaces/Script"
import mongoose, { Schema, model } from "mongoose"

const scriptSchema = new Schema<Script> (
    {
        _id: { type: mongoose.Schema.Types.ObjectId, required: true },
        uid: { type: mongoose.Schema.Types.ObjectId, required: true },
        crsnum: { type: String }
    }
)

const scriptModel = model( 'Script', scriptSchema )

export default scriptModel;