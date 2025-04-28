import { NextFunction, Response, Request } from "express";
import Comment from "../../model/comment";
import User from "../../model/user";
import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/app-error";
import Post from "../../model/post";
import socket from "../../io/io";
import SocketMessages from "socket-enum-danielraz";


export async function createComment(req: Request<{ postId: string }>, res: Response, next: NextFunction) {
    try {
        const userId = req.userId
        console.log(userId)
        if (!userId) {
            return next(new AppError(StatusCodes.UNAUTHORIZED, 'Authentication Error'))
        }
            
        const { postId } = req.params
        console.log(postId)
        if (!postId) {
            return next(new AppError(StatusCodes.BAD_REQUEST, 'Missing Post ID'))
        }

        const post = await Post.findByPk(postId)
        if (!post) {
            return next(new AppError(StatusCodes.NOT_FOUND, 'Post not found'))
        }

        const comment = await Comment.create({
            userId,
            postId,
            ...req.body
        })
        console.log('Comment:', comment)

        await comment.reload({
            include: [User]
        })
        console.log('Comment after reload:', comment)

        res.status(StatusCodes.CREATED).json(comment)
        socket.emit(SocketMessages.NEW_COMMENT, {from: req.headers['x-client-id'], data: comment})

    } catch (err) {
        console.error('Create Comment Error:', err)
        next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to create new comment'))
    }
}