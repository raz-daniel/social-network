import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../models/user/User";

interface FollowersState {
    followers: User[]
    isLoading: boolean
}

const initialState: FollowersState = {
    followers: [],
    isLoading: true
}

export const followersSlice = createSlice({
   name: 'Followers',
   initialState,
    reducers: {
        init: (state, action: PayloadAction<User[]>) => {
            state.followers = action.payload
            state.isLoading = false
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        }
    }
})

export const {init} = followersSlice.actions

export default followersSlice.reducer