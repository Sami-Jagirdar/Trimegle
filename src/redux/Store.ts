import { configureStore } from "@reduxjs/toolkit";
import PeerConnectionsReducer from "./PeerConnectionSlice";

const store = configureStore({
    reducer: {
        peerConnections: PeerConnectionsReducer,
    },
})

// Following two lines are from the react-redux docs

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;