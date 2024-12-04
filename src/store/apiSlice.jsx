import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://api.ohotaktiv.ru/api/v2/test_front/index.php";

export const fetchGames = createAsyncThunk("games/fetchGames", async () => {
    const res = await fetch(API_URL);
    if (!res.ok) {
        throw new Error("Failed fetch data");
    }
    return await res.json();
})

const apiSlice = createSlice({
    name: "games",
    initialState: {
        data: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGames.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchGames.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchGames.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    }
})

export default apiSlice.reducer;