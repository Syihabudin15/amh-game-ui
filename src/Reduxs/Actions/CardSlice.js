import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

const base = process.env.REACT_APP_BASE || 'http://localhost:5000';

export const getCard = createAsyncThunk('/card/get', async () => {
    let token = Cookies.get('auth-token');
    let result = await axios.request({
        method: 'GET',
        url: `${base}/api/user/card`,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'auth-token': `${token}`
        }
    });
    return result.data.data;
});

export const CreateCard = createAsyncThunk('/card/create', async (data) => {
    let token = Cookies.get('auth-token');
    let result = await axios.request({
        method: 'POST',
        url: `${base}/api/user/card`,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'auth-token': `${token}`
        },
        data: data
    });
    return result.data.data;
});

export const DeleteCard = createAsyncThunk('/card/delete', async (id) => {
    let token = Cookies.get('auth-token');
    let result = await axios.request({
        method: 'DELETE',
        url: `${base}/api/user/card/${id}`,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'auth-token': `${token}`
        }
    });
    return result.data.data;
})

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
            notification.error({message: 'Plaese login'})
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
        },

        [CreateCard.pending]: (state) => {
            state.isLoading = true;
        },
        [CreateCard.rejected]: (state, action) => {
            state.isLoading = false;
            notification.error({message: 'You have that Card'});
        },
        [CreateCard.fulfilled]: (state) => {
            state.isLoading = false;
            notification.success({message: 'Create Card success'});
        },

        [DeleteCard.pending]: (state) => {
            state.isLoading = true;
        },
        [DeleteCard.rejected]: (state, action) => {
            state.isLoading = false;
            notification.error({message: 'Server Error. please try again later'});
        },
        [DeleteCard.fulfilled]: (state) => {
            state.isLoading = false;
            notification.info({message: 'Card Deleted'});
        }
    }
});

export default CardSlice.reducer;