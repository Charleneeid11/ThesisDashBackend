import mongoose from "mongoose";

export interface Folder {
    _id: mongoose.Schema.Types.ObjectId,
    uid: mongoose.Schema.Types.ObjectId,
    name: string,
    files: mongoose.Schema.Types.ObjectId[],
    size: number,
    language: 'Python' | 'Java',
    crsnum: string,
    grade: number,
    pts_poss: number 
}