import { NextFunction, Response, Request } from "express";
import User from "../../model/user";
import { createHmac } from "crypto";
import config from 'config'
import { sign } from "jsonwebtoken";
import AppError from "../../errors/app-error";
import { StatusCodes } from "http-status-codes";

export function hashPassword(password: string): string {
    return createHmac('sha256', config.get<string>('app.secret'))
        .update(password)
        .digest('hex')
}



export async function login(req: Request<{}, {}, { username: string, password: string }>, res: Response, next: NextFunction) {
    try {
        const { username, password } = req.body
        console.log(`req body username: ${username}, password: ${password}`)
        if (!username || !password) {
            return next(new AppError(StatusCodes.BAD_REQUEST, 'Username and Password required'))
        }

        const user = await User.findOne({
            where: {
                username,
                password: hashPassword(password)
            }
        })
        console.log('User:', user)
        if (!user) {
            return next(new AppError(StatusCodes.UNAUTHORIZED, 'Invalid username or password'))
        }

        const jwt = sign(user.get({ plain: true }), config.get<string>('app.jwtSecret'))
        console.log('jwt:', jwt)
        if (!jwt) {
            return next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to generate token'))
        }

        res.json({ jwt })

    } catch (err) {
        console.error('Login Error:', err)
        next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Authentication Failed'))
    }
}

export async function signup(req: Request<{}, {}, { 
    username: string, password: string, 
    name: string, imageUrl?: string 
}>, res: Response, next: NextFunction) {
    try {
        const { username, password, name } = req.body
        console.log(`name: ${name}, username: ${username}, password: ${password}`)
        if (!username || !password || !name) {
            return next(new AppError(StatusCodes.BAD_REQUEST, 'Name, Username & Password Required'))
        }
    

        try {
            const user = await User.create({
                username,
                password: hashPassword(password),
                name,
                imageUrl: req.imageUrl || null
            })
            console.log(user)

            const jwt = sign(user.get({ plain: true }), config.get<string>('app.jwtSecret'))
            console.log('jwt:', jwt)
            if (!jwt) {
                return next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to generate Authentication token'))
            }

            res.status(StatusCodes.CREATED).json({ jwt })

        } catch (err) {
            if (err.name === 'SequelizeUniqueConstraintError') {
                return next(new AppError(StatusCodes.CONFLICT, 'Username already exists'))
            }
            throw err
        }

    } catch (err) {
        console.error('Signup Failed:', err)
        next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to Create Account'))
    }
}