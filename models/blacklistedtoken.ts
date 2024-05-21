import mongoose, { Schema, model } from "mongoose"
import type { BlackListedToken } from "../interfaces/BlackListedToken"

const blackListedTokenSchema = new Schema<BlackListedToken> (
    {
        uid: { type: mongoose.Schema.Types.ObjectId},
        token: { type: String, required: true },
        creationdate: {type: Date, default: Date.now, expires: '1h' }
    }
)

const blackListedTokenModel = model('BlackListedToken', blackListedTokenSchema)

export default blackListedTokenModel;