import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

export const getAllMyHero = createAsyncThunk('/my-heroes/get', async () => {
    let token = Cookies.get('auth-token');
    let result = await axios.request({
        method: 'GET',
        url: 'https://amh-game-api.up.railway.app/api/user/my-hero',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'auth-token': `${token}`
        }
    });
    return result.data.data;
});

const MyHeroSlice = createSlice({
    name: 'MyHeroSlice',
    initialState: {
        isLoading: false,
        myHeroes: []
    },
    extraReducers: {
        [getAllMyHero.pending]: (state) => {
            state.isLoading = true;
        },
        [getAllMyHero.rejected]: (state) => {
            state.isLoading = false;
            notification.error({message: 'Error while getting your hero from server'});
        },
        [getAllMyHero.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.myHeroes = action.payload;
        }
    }
});

export default MyHeroSlice.reducer;