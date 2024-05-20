import type { User } from "../interfaces/User";
import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema<User> (
    {
        email : { type: String, required : true },
        password : { type: String, required : true },
        utype : { type: String, enum : [ 'Admin', 'User' ], required : true },
        refresh: { type: String }
    }
)

const userModel = model<User> ( 'User', userSchema )

export default userModel;
