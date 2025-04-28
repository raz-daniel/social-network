import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import PostDraft from "../models/post/PostDrafts";
import BasePost from "../models/post/BasePost";

interface EditState {
    post: BasePost
}

const initialState: EditState = {
    post: {
        title: '',
        body: ''
    }
}

export const editSlice = createSlice({
    name: 'Edit',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<BasePost>) => {
            state.post = action.payload
        }
    }
})

export const {init} = editSlice.actions

export default editSlice.reducer
