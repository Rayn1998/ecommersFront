import IGood from 'types/Good';

import { createSlice } from '@reduxjs/toolkit';

interface IGoodsSlice {
	goods: IGood[];
}

const initialState: IGoodsSlice = {
	goods: [],
};

const goodsSlice = createSlice({
	name: 'goods',
	initialState,
	reducers: {
		setGoods(state, { payload }) {
			state.goods = [...payload];
		},
		addOneGood(state, { payload }) {
		state.goods = [payload, ...state.goods];
		},
		filterGoods(state, { payload }) {
			state.goods = state.goods.filter((good) => good._id !== payload.good._id);
		},
		changeGood(state, { payload }) {
			state.goods = state.goods.map((good) => {
				return good._id === payload._id ? payload : good;
			});
		},
		filterHighPrice(state) {
			
			state.goods = state.goods.sort((a, b) => b.price - a.price);
		},
		filterLowPrice(state) {
			state.goods = state.goods.sort((a, b) => a.price - b.price);
		},
		filterMostRated(state) {
			state.goods = state.goods.sort((a, b) => b.rating - a.rating)
		}
	},
});

export const { 
	setGoods, 
	addOneGood, 
	filterGoods, 
	changeGood, 
	filterHighPrice,
	filterLowPrice,
	filterMostRated,
} = goodsSlice.actions;
export default goodsSlice.reducer;
