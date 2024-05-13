import type { User } from "../interfaces/User";
import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema<User> (
    {
        _id: { type: mongoose.Schema.Types.ObjectId, required: true },
        email : { type: String, required : true },
        password : { type: String, required : true },
        utype : { type: String, enum : [ 'Admin', 'User' ], required : true },
    }
)

const userModel = model<User> ( 'User', userSchema )

export default userModel;
