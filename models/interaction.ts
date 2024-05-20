import mongoose, { Schema, model } from "mongoose"
import type { Interaction } from "../interfaces/Interaction"

const interactionSchema = new Schema<Interaction> (
    {
        uid: { type: String, required: true },
        itype: { type: String, required: true }
    }
)

const interactionModel = model('Interaction', interactionSchema)

export default interactionModel;