import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import axios from "axios";

export const getAllCollection = createAsyncThunk('/collection/get', async (page) => {
    let result = await axios.get(`https://amh-game-api.up.railway.app/api/collection?page=${page}`);
    return result.data.data;
});

export const SearchCollectionName = createAsyncThunk('/collection/name', async ({page, name}) => {
    let result = await axios.get(`https://amh-game-api.up.railway.app/api/collection/find?page=${page}&name=${name}`);
    return result.data.data;
});

const CollectionSlice = createSlice({
    name: 'CollectionSlice',
    initialState: {
        loading: false,
        total: 0,
        collections: [],
    },
    extraReducers: {
        [getAllCollection.pending]: (state) => {
            state.loading = true;
        },
        [getAllCollection.rejected]: (state) => {
            state.loading = false;
            notification.error({message: 'Server error'});
        },
        [getAllCollection.fulfilled]: (state, action) => {
            state.loading = false;
            state.total = action.payload.count;
            state.collections = action.payload.rows;
        },
        [SearchCollectionName.pending]: (state) => {
            state.loading = true;
        },
        [SearchCollectionName.rejected]: (state) => {
            state.loading = false;
            notification.error({message: 'Server error'});
        },
        [SearchCollectionName.fulfilled]: (state, action) => {
            state.loading = false;
            state.total = action.payload.count;
            state.collections = action.payload.rows;

        }
    }
});

export default CollectionSlice.reducer;