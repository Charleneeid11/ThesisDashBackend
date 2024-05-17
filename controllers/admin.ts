import type { Request, Response } from "express"
import userModel from "../models/user"
import bcrypt from 'bcrypt'
import sendEmail from "../services/email"
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../services/tokens"
import mongoose from "mongoose"
import blackListedTokenModel from "../models/blacklistedtoken"
import { JwtPayload } from "jsonwebtoken"

const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body as { email: string, password: string }
        const user = await userModel.find({ email })
        if ( user )
            {
                res.status(400).json({ error: 'This email already has an account to it.' })
            }
        const hashedpass = bcrypt.hash(password, 10)
        const newuser = new userModel({ email, password: hashedpass, utype: 'Admin' })
        await newuser.save()
        const content = 'Welcome to the ScriptManager!\nYou have just created a new account successfully.'
        await sendEmail(email, 'Welcome', content)
        res.status(200).json({ message: 'New account successfully created.' })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while attempting to register.' })
    }
}

const login = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body as { email: string, password: string }
        const user = await userModel.findOne({ email })
        if ( !user ) {
            return res.status(400).json({ error: 'An account does not exist with this email.' })
            
        }
        const samepass = await bcrypt.compare(password, user.password)
        if (!samepass) {
            res.status(400).json({ error: 'Incorrect password.' })
        }
        const accessToken = generateAccessToken(user._id.toString())
        const refreshToken = generateRefreshToken(user._id.toString())
        //save refresh in user
        res.status(200).json({ accessToken, refreshToken })
    }   catch (error) {
        res.status(400).json({ error: 'An error occurred while attempting to login.' })
    }
}

const refreshAccessToken = async (req: Request, res: Response): Promise<void> => {
    try {
        const { refreshToken } = req.body as { refreshToken: string }
        if (typeof verifyRefreshToken(refreshToken) === 'string') {
            console.error('Decoded token is a string:', verifyRefreshToken(refreshToken))
        } else {
        const payload = verifyRefreshToken(refreshToken) as JwtPayload
        if (!payload) {
            res.status(401).json({ error: 'Invalid refresh token.' })
            return
        }
        const newAccessToken = generateAccessToken(payload.userId)
        const newRefreshToken = generateRefreshToken(payload.userId)
        res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken })
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' })
    }
}

const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            res.status(401).json({ error: 'The token is missing.' })
            return
        }
        const token = authHeader.replace('Bearer ', '')
        const blacklistedToken = new blackListedTokenModel({ token })
        await blacklistedToken.save()
        res.status(200).json({ message: 'Successfully logged out.' })   
    } catch (error) {
        res.status(400).json({ error: 'An error occurred while attempting to log out.' })
    }
}

const deleteAccount = async (req: Request, res: Response): Promise<void> => {
    try {
        const uid = req.body as { _id: mongoose.ObjectId }
        await userModel.findByIdAndDelete(uid)
        res.status(200).json({ message: 'User successfully deleted.' })
    } catch (error) {
        res.status(400).json({ error: 'An error occurred while attempting to delte this account.' })
    }
}

export default {
    signup,
    login,
    refreshAccessToken,
    logout,
    deleteAccount
}
