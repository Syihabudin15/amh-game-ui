import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";

const base = process.env.REACT_APP_BASE || 'http://localhost:5000';

export const getHistoryWallet = createAsyncThunk('/wallet/history', async (type) => {
    let token = Cookies.get('auth-token');
    let result = await axios.request({
        method: 'GET',
        url: `${base}/api/user/wallet/history-${type}`,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'auth-token': `${token}`
        }
    });
    return result.data.data;
});

const WalletHistorySlice = createSlice({
    name: 'WalletHistorySlice',
    initialState: {
        loading: false,
        data: []
    },
    extraReducers: {
        [getHistoryWallet.pending]: (state) => {
            state.loading = true;
        },
        [getHistoryWallet.rejected]: (state) => {
            state.loading = false;
        },
        [getHistoryWallet.fulfilled]: (state, action) => {
            let data = [];
            for(let i = 0; i < action.payload.length; i++){
                data.push({
                    date: action.payload[i].createdAt,
                    to: action.payload[i].to,
                    amount: action.payload[i].amount,
                    type: action.payload[i].type,
                    status: action.payload[i].status,
                    paid: action.payload[i].is_paid
                });
            }
            state.data = data;
            state.loading = false;
        }
    }
});

export default WalletHistorySlice.reducer;