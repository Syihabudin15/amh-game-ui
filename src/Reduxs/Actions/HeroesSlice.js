import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import axios from "axios";

const base = process.env.BASE || 'http://localhost:5000';

export const getHeroCollections = createAsyncThunk('/collectoin/heroes', async ({page, id}) => {
    let result = await axios.get(`${base}/api/collection/heroes?page=${page}&id=${id}`);
    return result.data.data;
});

export const getAllHeroes = createAsyncThunk('/heroes/get', async (page) => {
    let result = await axios.get(`${base}/api/marketplace/heroes?page=${page}`);
    return result.data.data;
});
export const SearchByLevel = createAsyncThunk('/heroes/level', async ({page, level}) => {
    let result = await axios.get(`${base}/api/marketplace/heroes/level?page=${page}&level=${level}`);
    return result.data.data;
});
export const SearchByPrice = createAsyncThunk('/heroes/price', async({page, min, max}) => {
    let result = await axios.get(`${base}/api/marketplace/heroes/price?page=${page}&min=${min}&max=${max}`);
    return result.data.data;
});
export const SearchByCollectionName = createAsyncThunk('/heroes/collections', async({page, name}) => {
    let result = await axios.get(`${base}/api/marketplace/heroes/collection?page=${page}&name=${name}`);
    return result.data.data;
});

const HeroesSlice = createSlice({
    name: 'HeroesSlice',
    initialState: {
        loading: false,
        name: null,
        total: 0,
        heroes: []
    },
    extraReducers: {
        [getHeroCollections.pending]: (state) => {
            state.loading = true;
        },
        [getHeroCollections.rejected]: (state) => {
            state.loading = false;
            notification.error({message: 'Server Error'});
        },
        [getHeroCollections.fulfilled]: (state, action) => {
            state.loading = false;
            state.total = action.payload.count;
            state.heroes = action.payload.rows;
            state.name = action.payload.rows[0].m_collection.name
        },

        [getAllHeroes.pending]: (state) => {
            state.loading = true;
        },
        [getAllHeroes.rejected]: (state) => {
            state.loading = false;
            notification.error({message: 'Server Error'});
        },
        [getAllHeroes.fulfilled]: (state, action) => {
            state.loading = false;
            state.total = action.payload.count;
            state.heroes = action.payload.rows;
        },

        [SearchByLevel.pending]: (state) => {
            state.loading = true;
        },
        [SearchByLevel.rejected]: (state) => {
            state.loading = false;
            notification.error({message: 'Server Error'});
        },
        [SearchByLevel.fulfilled]: (state, action) => {
            state.loading = false;
            state.total = action.payload.count;
            state.heroes = action.payload.rows;
        },

        [SearchByPrice.pending]: (state) => {
            state.loading = true;
        },
        [SearchByPrice.rejected]: (state) => {
            state.loading = false;
            notification.error({message: 'Server Error'});
        },
        [SearchByPrice.fulfilled]: (state, action) => {
            state.loading = false;
            state.total = action.payload.count;
            state.heroes = action.payload.rows;
        },

        [SearchByCollectionName.pending]: (state) => {
            state.loading = true;
        },
        [SearchByCollectionName.rejected]: (state) => {
            state.loading = false;
            notification.error({message: 'Server Error'});
        },
        [SearchByCollectionName.fulfilled]: (state, action) => {
            state.loading = false;
            state.total = action.payload.count;
            state.heroes = action.payload.rows;
        },
    }
});

export default HeroesSlice.reducer;