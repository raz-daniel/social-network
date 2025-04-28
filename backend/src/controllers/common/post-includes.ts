import User from "../../model/user"
import Comment from "../../model/comment"
const postIncludes = {
    include: [
        User,
        {
            model: Comment,
            include: [ User ]
        }
    ]
}

export default postIncludes