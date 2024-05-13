import mongoose from "mongoose";

export interface Script {
    _id: mongoose.Schema.Types.ObjectId,
    uid: mongoose.Schema.Types.ObjectId,
    name: string,
    size: number,
    language: 'Python' | 'Java',
    crsnum: string
}