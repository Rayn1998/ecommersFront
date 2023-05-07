import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isOpen: false,
};

const createGoodPopupSlice = createSlice({
	name: 'createGoodPopup',
	initialState,
	reducers: {
		setOpen(state, { payload }) {
			state.isOpen = !state.isOpen;
		},
	},
});

export const { setOpen } = createGoodPopupSlice.actions;
export default createGoodPopupSlice.reducer;