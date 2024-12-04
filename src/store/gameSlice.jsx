import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchGames } from "./apiSlice";

export const sendGameResult = createAsyncThunk(
    "game/sendGameResult",
    async (gameResult) => {
        const res = await fetch('https://api.ohotaktiv.ru/api/v2/test_front/index.php', {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(gameResult),
        }
    );

    if (!res.ok) {
        throw new Error("Failed to send game result")
    }

    return gameResult;

    }
)

const initialState = {
    board: Array(9).fill(null),
    currentPlayer: "X",
    winner: null,
    data: [],
    status: "idle",
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        makeMove(state, action) {
            const { index } = action.payload;
            if (!state.board[index] && !state.winner) {
                state.board[index] = state.currentPlayer;
                state.currentPlayer = state.currentPlayer === "X" ? "O" : "X";
                state.winner = checkWinner(state.board);
            }
        },
        restartGame(state) {
            state.board = Array(9).fill(null);
            state.currentPlayer = 'X';
            state.winner = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendGameResult.fulfilled, (state, action) => {
                state.data.push(action.payload);
            })
            .addCase(fetchGames.fulfilled, (state, action) => {
                state.data = action.payload;
            });
        },
});

function checkWinner(board) {
    const lines = [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8], 
        [0, 3, 6], 
        [1, 4, 7], 
        [2, 5, 8], 
        [0, 4, 8], 
        [2, 4, 6],            
    ];

    for (const [a, b, c] of lines) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    
    if (!board.includes(null)) {
        return "Ничья";
    }

    return null;
}

export const { makeMove, restartGame, saveGameToHistory } = gameSlice.actions;
export default gameSlice.reducer;