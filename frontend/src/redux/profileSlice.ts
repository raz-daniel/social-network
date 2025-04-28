import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Post from "../models/post/Post"
import Comment from "../models/comment/Comment"

interface ProfileState {
    posts: Post[]
    isNewPost: boolean
    isLoading: boolean
}

const initialState: ProfileState = {
    posts: [],
    isNewPost: false,
    isLoading: true
}

export const profileSlice = createSlice({
    name: 'Profile',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<Post[]>) => {
            state.posts = action.payload
            state.isNewPost = false
            state.isLoading = false
        },
        newPost: (state, action: PayloadAction<Post>) => {
            state.posts = [action.payload, ...state.posts]
        },
        remove: (state, action: PayloadAction<{id: string}>) => {
            state.posts = state.posts.filter(p => p.id !== action.payload.id)
        },
        update: (state, action: PayloadAction<Post>) => {
            const index = state.posts.findIndex(p => p.id === action.payload.id)
            if (index > -1) {
                state.posts[index] = action.payload
            }
        },
        addComment: (state, action: PayloadAction<Comment>) => {
            state.posts.find(p => p.id === action.payload.postId)?.comments.push(action.payload)
        },
        setNewPost: (state, action: PayloadAction<boolean>) => {
            state.isNewPost = action.payload
            
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        }
    }
})

export const {init, newPost, remove, update, addComment, setNewPost} = profileSlice.actions

export default profileSlice.reducer