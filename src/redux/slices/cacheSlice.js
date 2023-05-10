import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	data: {},
};

const cacheSlice = createSlice({
	name: 'cache',
	initialState,
	reducers: {
		setCache(state, { payload }) {
			state.data = payload;
		},
    removeCache(state) {
      state.data = {};
    }
	},
});

export const { setCache, removeCache } = cacheSlice.actions;
export default cacheSlice.reducer;
