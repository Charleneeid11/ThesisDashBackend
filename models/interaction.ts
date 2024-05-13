import mongoose, { Schema, model } from "mongoose"
import type { Interaction } from "../interfaces/Interaction"

const interactionSchema = new Schema<Interaction> (
    {
        _id: { type: mongoose.Schema.Types.ObjectId },
        uid: { type: String },
        itype: { type: String}
    }
)

const interactionModel = model('Interaction', interactionSchema)

export default interactionModel;