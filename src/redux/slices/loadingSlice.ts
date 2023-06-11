import { createSlice } from '@reduxjs/toolkit';

const initialState: boolean = false;

const loadingSlice = createSlice({
	name: 'loading',
	initialState,
	reducers: {
		loadingOn(state) {
			state = true;
		},
		loadingOff(state) {
			state = false;
		},
	},
});

export const { loadingOn, loadingOff } = loadingSlice.actions;

export default loadingSlice.reducer;

