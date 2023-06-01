import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../../../redux/slices/cartSlice';

const CartItem = ({ props }) => {
	const dispatch = useDispatch();

	const [amount, setAmount] = useState(1);

	const incr = useCallback(() => {
		setAmount(amount => amount + 1);
	}, []);

	const decr = useCallback(() => {
		amount > 1 
		? setAmount(amount => amount - 1)
		: handleDel();
	}, [amount]);

	const handleDel = useCallback(() => {
		dispatch(removeFromCart(props));
	}, []);
	return (
		<div className='cart-item'>
			<img className='cart-item__image' src={props.image} alt={props.name} />
			<div className='count-wrapper'>
				<p>Amount: {amount}</p>
				<button onClick={incr}>+</button>
				<button onClick={decr}>-</button>
			</div>
			<button
				onClick={handleDel}
			>X</button>
		</div>
	);
};

export default CartItem;
