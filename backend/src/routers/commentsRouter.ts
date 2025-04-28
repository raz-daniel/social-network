import { Router } from "express";
import { createComment } from "../controllers/comments/controller";
import validation from "../middlewares/validation";
import { newCommentParamsValidator, newCommentValidator } from "../controllers/comments/validators";
import paramsValidation from "../middlewares/param-validation";

const commentsRouter = Router()

commentsRouter.post('/:postId',
    validation(newCommentValidator),
    paramsValidation(newCommentParamsValidator),
    createComment
)

export default commentsRouter