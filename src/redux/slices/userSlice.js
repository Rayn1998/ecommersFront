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
		setUserDefault(state) {
			state.data = initialState.data;
		},
		addFavourite(state, { payload }) {
			state.data.favourites = [ ...state.data.favourites, payload ];
		},
		removeFavourite(state, { payload }) {
			state.data.favourites = state.data.favourites.filter(
				(fav) => fav._id !== payload._id
			);
		},
	},
});

export const { setUser, setUserDefault, addFavourite, removeFavourite } =
	userSlice.actions;

export default userSlice.reducer;
