import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	data: {
		name: 'defaultName',
		email: 'defaultEmail',
		favourites: [],
	},
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, { payload }) {
			state.data = { ...state.data, ...payload };
		},
		setUserDefault(state, action) {
			state.data = initialState.data;
		},
		addFavourite(state, { payload }) {
			state.data.favourites = [ ...state.data.favourites, payload ];
		}
	},
});

export const { setUser, setUserDefault, addFavourite } = userSlice.actions;

export default userSlice.reducer;
