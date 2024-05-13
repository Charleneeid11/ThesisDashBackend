import mongoose from "mongoose"

export interface Interaction {
    _id: mongoose.Schema.Types.ObjectId,
    uid: mongoose.Schema.Types.ObjectId,
    itype: string, // to be an enum when possible interactions are specified
}