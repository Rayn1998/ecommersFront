import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInputSlice {
	input: string;
}

const initialState: IInputSlice = {
	input: ''
};

const inputSlice = createSlice({
	name: 'input',
	initialState,
	reducers: {
		setInput(state, { payload }: PayloadAction<string>) {
			state.input = payload;
		},
	},
});

export const { setInput } = inputSlice.actions;

export default inputSlice.reducer;