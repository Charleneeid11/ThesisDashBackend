import mongoose from "mongoose";

export interface Script {
    _id: mongoose.Schema.Types.ObjectId,
    uid: mongoose.Schema.Types.ObjectId,
    crsnum: string
}