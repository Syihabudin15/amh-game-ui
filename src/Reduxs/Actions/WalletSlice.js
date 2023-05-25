import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const base = process.env.BASE || 'http://localhost:5000';

export const getWallet = createAsyncThunk('/user/wallet', async () => {
    let token = Cookies.get('auth-token');
    let result = await axios.request({
        method: 'GET',
        url: `${base}/api/user/wallet`,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'auth-token': `${token}`
        }
    });
    return result.data.data;
});

const WalletSlice = createSlice({
    name: 'WalletSlice',
    initialState: {
        isLoading: false,
        balance: null,
        noWallet: null
    },
    extraReducers: {
        [getWallet.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getWallet.rejected]: (state, action) => {
            state.isLoading = false;
        },
        [getWallet.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.balance = action.payload.balance;
            state.noWallet = action.payload.no_wallet;
        }
    }
});

export default WalletSlice.reducer;