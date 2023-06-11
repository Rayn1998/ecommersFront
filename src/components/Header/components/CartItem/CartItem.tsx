import { useState, useCallback, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../../../redux/slices/cartSlice';

// TYPES
import { RootState } from 'redux/store';
import IGood from 'types/Good';

interface IModGood extends IGood {
	amount: number;
}

interface IProps {
	props: IModGood;
}

const CartItem: FC<IProps> = ({ props }) => {
	const cart = useSelector((state: RootState) => state.cart.data);
	const dispatch = useDispatch();
	
	const [amount, setAmount] = useState(props.amount);
	const changeStorageCartAmount = useCallback((action?: 'incr') => {
		const storageCart = JSON.parse(localStorage.getItem('cart'));
 	 	const cart = storageCart.map((item: IModGood) => {
    if (item._id === props._id) {
      item.amount = action === 'incr' ? amount + 1 : amount - 1;
      return item;
    } else {
      return item;
    }
  });
  localStorage.setItem('cart', JSON.stringify(cart));
	}, [amount]);

	const incr = useCallback((): void => {
		changeStorageCartAmount('incr');
		setAmount(amount => amount + 1);
	}, [cart, amount]);

	const decr = useCallback((e: React.MouseEvent): void => {
		if (amount > 1) {
			changeStorageCartAmount();
			setAmount(amount => amount - 1)
		} else {
			handleDel(e);
		}
	}, [amount]);

	const handleDel = useCallback((e: React.MouseEvent): void => {
		e.stopPropagation();
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
			></button>
		</div>
	);
};

export default CartItem;
