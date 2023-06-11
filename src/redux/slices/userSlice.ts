import Good from 'types/Good';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IData {
	name: string;
	email: string;
	favourites: Good[];
	role: string;
	_id: string;
}

interface IUserSlice {
	data: IData;
}

const initialState: IUserSlice = {
	data: {
		name: 'defaultName',
		email: 'defaultEmail',
		favourites: [],
		role: 'custome',
		_id: '',
	},
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, { payload }: PayloadAction<IUserSlice>) {
			state.data = { ...state.data, ...payload };
		},
		setUserDefault(state) {
			state.data = initialState.data;
		},
		addFavourite(state, { payload }: PayloadAction<Good>) {
			state.data.favourites = [ ...state.data.favourites, payload ];
		},
		removeFavourite(state, { payload }: PayloadAction<Good>) {
			state.data.favourites = state.data.favourites.filter(
				(fav: Good) => fav._id !== payload._id
			);
		},
	},
});

export const { setUser, setUserDefault, addFavourite, removeFavourite } =
	userSlice.actions;

export default userSlice.reducer;
