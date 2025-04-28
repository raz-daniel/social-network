import { NextFunction, Response, Request } from "express";
import User from "../../model/user";
import Post from "../../model/post";
import Comment from "../../model/comment";
import postIncludes from "../common/post-includes";
import AppError from "../../errors/app-error";
import { StatusCodes } from "http-status-codes";
import socket from "../../io/io";
import SocketMessages from "socket-enum-danielraz";

export async function getProfile(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.userId
        console.log('userId:', userId)
        if (!userId) {
            return next(new AppError(StatusCodes.UNAUTHORIZED, 'Authentication Required'))
        }

        const user = await User.findByPk(userId, {
            include: [{
                model: Post,
                ...postIncludes
            }]
        })
        console.log('user:', user)
        if (!user) {
            return next(new AppError(StatusCodes.NOT_FOUND, 'User not found!'))
        }

        const plainUser = user.get({ plain: true })
        if (!plainUser.posts || plainUser.posts.length === 0) {
            return next(new AppError(StatusCodes.NOT_FOUND, 'No Posts found'))
        }

        res.status(StatusCodes.OK).json(plainUser.posts)

    } catch (err) {
        console.error('getProfile Error:', err)
        next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to retrieve profile posts'))

    }
}


export async function getPost(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
        console.log('req.param.id', req.params.id)
        if (!req.params.id) {
            return next(new AppError(StatusCodes.BAD_REQUEST, 'cannot find post id'))
        }

        const post = await Post.findByPk(req.params.id, postIncludes)
        console.log('post:', post)
        if (!post) {
            return next(new AppError(StatusCodes.NOT_FOUND, 'Post Not Found'))
        }

        res.status(StatusCodes.OK).json(post)

    } catch (err) {
        console.error('getPost Error:', err)
        next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to retrieve post'))
    }
}

export async function deletePost(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
        console.log('req.params.id:', req.params.id)
        if (!req.params.id) {
            return next(new AppError(StatusCodes.BAD_REQUEST, 'cannot find post id'))
        }

        const id = req.params.id
        const deletedCount = await Post.destroy({
            where: { id }
        })
        if (deletedCount === 0) {
            return next(new AppError(StatusCodes.NOT_FOUND, 'Posts not found'))
        }

        res.status(StatusCodes.OK).json({ success: true })

    } catch (err) {
        console.error('Delete Post Error:', err)
        next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to delete post'))
    }
}

export async function createPost(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.userId
        console.log('userId:', userId)
        if (!userId) {
            return next(new AppError(StatusCodes.UNAUTHORIZED, 'Authentication Required'))
        }

        let createParams = { ...req.body, userId }

        if (req.imageUrl) {
            const { imageUrl } = req
            createParams = {...createParams, imageUrl}
        }

        const post = await Post.create(createParams)
        console.log('post:', post)

        await post.reload(postIncludes)

        res.status(StatusCodes.CREATED).json(post)
        
        socket.emit(SocketMessages.NEW_POST, {from: req.headers['x-client-id'], data: post})

    } catch (err) {
        console.error('Creating Post Error:', err)
        next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to create post'))
    }

}

export async function updatePost(req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
    try {
        const { title, body } = req.body
        console.log(`title: ${title}, body:${body}`)
        if (!title || !body) {
            return next(new AppError(StatusCodes.BAD_REQUEST, 'Title and Body are Required'))
        }

        const post = await Post.findByPk(req.params.id, postIncludes)
        console.log('post:', post)
        if (!post) {
            return next(new AppError(StatusCodes.NOT_FOUND, 'Post not found'))
        }

        if (post.title === title && post.body === body) {
            res.status(StatusCodes.NO_CONTENT).json({
                success: true,
                message: 'No changes needed'
            })
        }

        post.title = title
        post.body = body

        await post.save()

        res.status(StatusCodes.OK).json(post)

    } catch (err) {
        console.error('Updating Post Error:', err)
        next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to update post'))
    }
}