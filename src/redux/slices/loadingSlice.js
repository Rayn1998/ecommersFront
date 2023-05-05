import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

const loadingSlice = createSlice({
	name: 'loading',
	initialState,
	reducers: {
		loadingOn(state, { payload }) {
			state = true;
		},
		loadingOff(state, { payload }) {
			state = false;
		},
	},
});

export const { loadingOn, loadingOff } = loadingSlice.actions;

export default loadingSlice.reducer;

