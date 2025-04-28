import { NextFunction, Response, Request } from "express";
import User from "../../model/user";
import Follow from "../../model/follow";
import { col } from "sequelize";
import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/app-error";


export async function getFollowers(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.userId
        console.log('userId:', userId)
        if (!userId) {
            return next(new AppError(StatusCodes.UNAUTHORIZED, 'Authentication Required'))
        }

        const user = await User.findByPk(userId, {
            include: [{
                model: User,
                as: 'followers'
            }],
            order: [[col('followers.name'), 'ASC']]
        })
        console.log('user:', user)
        if (!user) {
            return next(new AppError(StatusCodes.NOT_FOUND, 'User not found!'))
        }

        res.status(StatusCodes.OK).json(user?.followers || [])

    } catch (err) {
        console.error('getFollowers Error:', err)
        next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to retrieve followers'))
    }
}

export async function getFollowing(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.userId
        console.log('userId:', userId)
        if (!userId) {
            return next(new AppError(StatusCodes.UNAUTHORIZED, 'Authentication Required'))
        }

        const user = await User.findByPk(userId, {
            include: [{
                model: User,
                as: 'following'
            }]
        })
        console.log('user:', user)
        if (!user) {
            return next(new AppError(StatusCodes.NOT_FOUND, 'User not found!'))
        }

        res.status(StatusCodes.OK).json(user?.following || [])
    } catch (err) {
        console.error('getFollowing Error:', err)
        next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to retrieve following'))
    }
}

export async function followUser(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.userId
        console.log('userId:', userId)
        if (!userId) {
            return next(new AppError(StatusCodes.UNAUTHORIZED, 'Authentication Required'))
        }

        if (!req.params.id) {
            return next(new AppError(StatusCodes.BAD_REQUEST, 'user ID is required'))
        }

        if (userId === req.params.id) {
            return next(new AppError(StatusCodes.BAD_REQUEST, 'Cannot Follow Yourself'))
        }

        const follow = await Follow.create({
            followerId: userId,
            followeeId: req.params.id
        })

        res.status(StatusCodes.CREATED).json(follow)
    } catch (err) {
        console.error('follow user Error:', err)
        if (err.name = 'SequelizeUniqueConstraintError') {
            return next(new AppError(StatusCodes.CONFLICT, 'Already Following this user.'))
        }

        next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to follow user'))
    }
}

export async function unfollowUser(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.userId
        console.log('userId:', userId)
        if (!userId) {
            return next(new AppError(StatusCodes.UNAUTHORIZED, 'Authentication Required'))
        }

        const isUnfollow = await Follow.destroy({
            where: {
                followerId: userId,
                followeeId: req.params.id
            }
        })
        if (!isUnfollow) {
            return next(new AppError(StatusCodes.NOT_FOUND, 'Not Following this User'))
        }
        
        res.status(StatusCodes.OK).json({ success: true })


    } catch (err) {
        console.error('unfollow Error:', err)
        next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to unfollow user'))
    }
}
