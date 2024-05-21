import type { Request, Response } from "express"
import userModel from "../models/user"
import bcrypt from 'bcrypt'
import sendEmail from "../services/email"
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../services/tokens"
import blackListedTokenModel from "../models/blacklistedtoken"
import { JwtPayload } from "jsonwebtoken"
import jwt from "jsonwebtoken"

const signup = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body as { email: string, password: string }
        const user = await userModel.findOne({ email })
        if ( user )
            {
                return res.status(409).json({ error: 'This email already has an account to it.' })
            }
        const hashedpass = await bcrypt.hash(password, 10)
        const newuser = new userModel({ email, password: hashedpass, utype: 'Admin' })
        await newuser.save()
        const content = 'Welcome to the ScriptManager!\nYou have just created a new account successfully.'
        await sendEmail(email, 'Welcome', content)
        return res.status(201).json({ message: 'New account successfully created.' })
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while attempting to register.' })
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
            return res.status(400).json({ error: 'Incorrect password.' })
        }
        const accessToken = generateAccessToken(user._id.toString())
        const refreshToken = generateRefreshToken(user._id.toString())
        user.refresh = refreshToken
        await user.save()
        return res.status(200).json({ accessToken, refreshToken })
    }   catch (error) {
        return res.status(500).json({ error: 'An error occurred while attempting to login.' })
    }
}

const getUsers = async (req: Request, res: Response): Promise<any> => {
    try {
        const users = await userModel.find()
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while attempting to fetch all users.' })
    }
}

const refreshAccessToken = async (req: Request, res: Response): Promise<any> => {
    try {
        const { refreshToken } = req.body as { refreshToken: string }
        if (typeof verifyRefreshToken(refreshToken) === 'string') {
            console.error('Decoded token is a string:', verifyRefreshToken(refreshToken))
        } else {
        const payload = verifyRefreshToken(refreshToken) as JwtPayload
        if (!payload) {
            return res.status(401).json({ error: 'Invalid refresh token.' })
        }
        const newAccessToken = generateAccessToken(payload.userId)
        const newRefreshToken = generateRefreshToken(payload.userId)
        return res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken })
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error.' })
    }
}

const logout = async (req: Request, res: Response): Promise<any> => {
    try {
        const authHeader = req.header('Authorization')
        if (!authHeader) {
            return res.status(401).json({ error: 'The token is missing.' })
        }
        const token = authHeader.replace('Bearer ', '')
        const isBlacklisted = await blackListedTokenModel.findOne({ token })
        if (isBlacklisted) {
            return res.status(401).json({ error: 'Token is already blacklisted.' })
        }
        try {
            const JWT_ACCESS_SECRET = process.env.access_secret as string | undefined
            if (!JWT_ACCESS_SECRET) {
                throw new Error('JWT access secret is not defined in environment variables')
            }
            jwt.verify(token, JWT_ACCESS_SECRET)
        } catch (err) {
            return res.status(401).json({ error: 'Invalid token.' })
        }
        const blacklistedToken = new blackListedTokenModel({ token })
        await blacklistedToken.save()
        return res.status(200).json({ message: 'Successfully logged out.' })
    } catch (error) {
        console.log("Error: ", error)
        return res.status(500).json({ error: 'An error occurred while attempting to log out.' })
    }
}

const deleteAccount = async (req: Request, res: Response): Promise<any> => {
    try {
        const uid = req.params.uid
        const user = await userModel.findById(uid)
        if (!user) {
            return res.status(404).json({ error: 'User not found.' })
        }
        if (user.refresh) {
                const blacklistedToken = new blackListedTokenModel({ token: user.refresh })
                await blacklistedToken.save()
            }
        await userModel.findByIdAndDelete(uid)
        return res.status(200).json({ message: 'User successfully deleted.' })
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while attempting to delete this account.' })
    }
}

export default {
    signup,
    login,
    getUsers,
    refreshAccessToken,
    logout,
    deleteAccount
}
