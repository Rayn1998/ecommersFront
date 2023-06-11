import { createSlice } from '@reduxjs/toolkit';

interface IState {
	isOpen: boolean;
	type: string;
}

const initialState: IState = {
	isOpen: false,
	type: '',
};

const createGoodPopupSlice = createSlice({
	name: 'createGoodPopup',
	initialState,
	reducers: {
		setOpen(state, { payload }) {
			state.isOpen = true;
			state.type = payload;
		},
		setClose(state) {
			state.isOpen = false;
			state.type = '';
		}
	},
});

export const { setOpen, setClose } = createGoodPopupSlice.actions;
export default createGoodPopupSlice.reducer;