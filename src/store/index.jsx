import { configureStore } from "@reduxjs/toolkit";
import apiReducer from './apiSlice'
import gameReducer from './gameSlice'

const store = configureStore({
    reducer: {
        games: apiReducer,
        game: gameReducer
    },
})

export default store;