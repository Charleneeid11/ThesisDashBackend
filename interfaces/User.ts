import mongoose from "mongoose"

export interface User {
    _id: mongoose.Schema.Types.ObjectId,
    email: string,
    password: string,
    utype: 'Admin' | 'User',
    refresh: string
}