import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "antd";
import axios from "axios";
import Cookies from "js-cookie";


export const getAllMyHeroHistory = createAsyncThunk('/my-heroes/history', async (page) => {
    let token = Cookies.get('auth-token');
    let result = await axios.request({
        method: 'GET',
        url: `https://amh-game-api.up.railway.app/api/user/my-hero/history?page=${page}`,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'auth-token': `${token}`
        }
    });
    return result.data.data;
});


const HistoryMyHeroSlice = createSlice({
    name: 'HistoryMyHeroSlice',
    initialState:{
        isLoading: false,
        total: 0,
        data: []
    },
    extraReducers: {
        [getAllMyHeroHistory.pending]: (state) => {
            state.isLoading = true;
        },
        [getAllMyHeroHistory.rejected]: (state) => {
            state.isLoading = false;
            notification.error({message: 'Server Error'});
        },
        [getAllMyHeroHistory.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.total = action.payload.count;
            state.data = action.payload.rows;
        }
    }
});

export default HistoryMyHeroSlice.reducer;