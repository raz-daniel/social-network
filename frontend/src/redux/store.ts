import { configureStore } from "@reduxjs/toolkit";
import { followingSlice } from "./followingSlice";
import { profileSlice } from "./profileSlice";
import { feedSlice } from "./feedSlice";
import { followersSlice } from "./followersSlice";
import { editSlice } from "./editSlice";

const store = configureStore({
    reducer: {
        following: followingSlice.reducer,
        profile: profileSlice.reducer,
        feed: feedSlice.reducer,
        followers: followersSlice.reducer,
        editPost: editSlice.reducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch =  typeof store.dispatch