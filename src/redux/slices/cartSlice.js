import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	data: {}
};

const cartSlice = createSlice({
  name: 'cart', 
  initialState,
  reducers: {
    addToCart(state, { payload }) {
      state.data = { ...state.data, ...payload };
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;