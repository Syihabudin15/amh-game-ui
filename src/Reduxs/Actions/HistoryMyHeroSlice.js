import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

const base = process.env.BASE || 'http://localhost:5000';

export const getAllMyHeroHistory = createAsyncThunk('/my-heroes/history', async (page) => {
    let token = Cookies.get('auth-token');
    let result = await axios.request({
        method: 'GET',
        url: `${base}/api/user/my-hero/history?page=${page}`,
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
            let res = [];
            for(let i=0; i < action.payload.rows.length; i++){
                res.push({
                    date: action.payload.rows[i].createdAt,
                    from: action.payload.rows[i].mUserId,
                    receiver: action.payload.rows[i].receiver,
                    type: action.payload.rows[i].type,
                    image: action.payload.rows[i].m_my_hero.m_hero.img
                });
            }
            console.log(res)
            state.data = res;
        }
    }
});

export default HistoryMyHeroSlice.reducer;