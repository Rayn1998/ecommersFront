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
				<p className='count-wrapper__amount'>Amount: {amount}</p>
				<div className='count-wrapper__buttons'>
					<button className='count-wrapper__button' onClick={incr}>+</button>
					<button className='count-wrapper__button' onClick={decr}>-</button>
				</div>
			</div>
			<button
				className='cart-item__delete'
				onClick={handleDel}
			>X</button>
		</div>
	);
};

export default CartItem;
