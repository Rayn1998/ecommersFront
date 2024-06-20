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
		role: 'customer',
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
		changeRole(state, { payload }: PayloadAction<string>) {
			state.data.role = payload;
		}
	},
});

// Убрать hcangeRole совсем, надо это меняит в апи

export const { setUser, setUserDefault, addFavourite, removeFavourite, changeRole } =
	userSlice.actions;

export default userSlice.reducer;
