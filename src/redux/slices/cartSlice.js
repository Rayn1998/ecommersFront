import { createSlice } from '@reduxjs/toolkit';
 
const initialState = {
	data: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
    setCart(state, { payload }) {
      state.data = payload;
    },
		addToCart(state, { payload }) {
			let cart = JSON.parse(localStorage.getItem('cart'));
			if (!cart) {
				cart = [];
			}
			if (
				state.data.some((item) => item._id === payload._id) 
        || cart.some((item) => item._id === payload._id)
			) {
				console.log(`It's already in cart`);
				return;
			} else {
        console.log('here');
				cart.push(payload);
				localStorage.setItem('cart', JSON.stringify(cart));
				state.data = cart;
			}
		},
		removeFromCart(state, { payload }) {
			let cart = JSON.parse(localStorage.getItem('cart'));
			if (!cart) {
				cart = [];
			}
			console.log('remove payload', payload);
			const newCart =cart.filter((item) => item._id !== payload._id);
			console.log('cart after map', newCart);
			
			localStorage.setItem('cart', JSON.stringify(newCart));
			state.data = newCart;
		},
	},
});

export const { addToCart, setCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
