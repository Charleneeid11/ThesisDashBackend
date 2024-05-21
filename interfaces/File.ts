import mongoose from "mongoose";

export interface File {
    _id: mongoose.Schema.Types.ObjectId,
    fid: mongoose.Schema.Types.ObjectId,
    name: string,
    size: number,
}