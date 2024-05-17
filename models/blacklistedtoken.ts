import mongoose, { Schema, model } from "mongoose"
import type { BlackListedToken } from "../interfaces/BlackListedToken"

const blackListedTokenSchema = new Schema<BlackListedToken> (
    {
        _id: { type: mongoose.Schema.Types.ObjectId, required: true },
        uid: { type: String, required: true },
        token: { type: String, required: true },
        creationdate: {type: Date, default: Date.now, expires: '1h' }
    }
)

const blackListedTokenModel = model('BlackListedToken', blackListedTokenSchema)

export default blackListedTokenModel;