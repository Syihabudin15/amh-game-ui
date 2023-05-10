import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const getCard = createAsyncThunk('', async () => {
    let token = Cookies.get('auth-token');
    let result = await axios.request({
        method: 'GET',
        url: 'https://amh-game-api.up.railway.app/api/user/card',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'auth-token': `${token}`
        }
    });
    return result.data.data;
});

const CardSlice = createSlice({
    name: 'CardSlice',
    initialState: {
        isLoading: false,
        data: []
    },
    extraReducers: {
        [getCard.pending]: (state) => {
            state.isLoading = true;
        },
        [getCard.rejected]: (state) => {
            state.isLoading = false;
        },
        [getCard.fulfilled]: (state, action) => {
            state.isLoading = false;
            let dataCard = [];
            for(let i = 0; i < action.payload.length; i++){
                dataCard.push({
                    no: i+1,
                    bank_name: action.payload[i].name,
                    no_bank: action.payload[i].no_card,
                    id: action.payload[i].id
                });
            }
            state.data = dataCard;
        }
    }
});

export default CardSlice.reducer;