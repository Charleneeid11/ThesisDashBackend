import mongoose from "mongoose";

export interface BlackListedToken {
    _id: mongoose.Schema.Types.ObjectId,
    uid: mongoose.Schema.Types.ObjectId,
    token: string,
    creationdate: Date
}