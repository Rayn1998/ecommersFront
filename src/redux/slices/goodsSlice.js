import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	goods: [],
};

const goodsSlice = createSlice({
	name: 'goods',
	initialState,
	reducers: {
		setGoods(state, { payload }) {
			state.goods = [...state.goods, ...payload];
		},
    addOneGood(state, { payload }) {
      state.goods = [payload, ...state.goods];
    },
		filterGoods(state, { payload }) {
			state.goods = state.goods.filter((good) => good._id !== payload.good._id);
		},
	},
});

export const { setGoods, addOneGood, filterGoods } = goodsSlice.actions;
export default goodsSlice.reducer;
