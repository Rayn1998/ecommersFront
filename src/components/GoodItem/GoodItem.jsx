import { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavourite, removeFavourite } from '../../redux/slices/userSlice';
import {
	addToCart,
	setCart,
	removeFromCart,
} from '../../redux/slices/cartSlice';
import { api } from '../../utils/Api';

import imageFav from '../../assets/images/fav.png';
import imageFavActive from '../../assets/images/fav_active.png';
import cartIcon from '../../assets/images/cartIcon.png';
import cartIconActive from '../../assets/images/cartIcon_active.png';

const GoodItem = ({ props }) => {
	 // TODO: не отключается кнопка BUY, если убрать карточку из корзины
	const userFavs = useSelector((state) => state.user.data.favourites);
	const cart = useSelector((state) => state.cart.data);
	const dispatch = useDispatch();
	const { name, brand, image, rating, price, _id: id } = props;

	const [inCart, setInCart] = useState(false);
	const [onBuy, setOnBuy] = useState(false);
	const [onMouse, setOnMouse] = useState(false);
	const [rotateX, setRotateX] = useState(0);
	const [rotateY, setRotateY] = useState(0);
	const cardRef = useRef();

	const rotateCard = (event) => {
		const node = cardRef.current;
		const mult = 6;

		const halfWidth = node.offsetWidth / 2;
		const halfHeight = node.offsetHeight / 2;

		const middleX = node.offsetLeft + halfWidth;
		const middleY = node.offsetTop + halfHeight;
		const x = event.clientX - middleX;
		const y = event.clientY - middleY;

		const offsetX = (x / halfWidth) * mult;
		const offsetY = (y / halfHeight) * mult;

		setRotateY(offsetX * -1);
		setRotateX(offsetY);
	};

	useEffect(() => {
		const node = cardRef.current;
		node.addEventListener('mousemove', rotateCard);
		return () => node.removeEventListener('mousemove', rotateCard);
	}, []);

	const checkFav = useCallback(() => {
		return userFavs.some((fav) => fav._id === id);
	}, [userFavs]);

	const checkInCart = useCallback(() => {
		return cart.some((item) => item._id === id);
	}, [cart]);

	const handleFav = useCallback(() => {
		if (checkFav()) {
			api
				.removeFavourite(id)
				.then(() => {
					dispatch(removeFavourite(props));
				})
		} else {
			api
				.addFavourite(id)
				.then(() => {
					dispatch(addFavourite(props));
				})
		}
	}, [userFavs]);

	const handleCartClick = useCallback(() => {
		if (checkInCart()) {
			dispatch(removeFromCart(props));
			setInCart(false);
			return;
		}
		setOnBuy(false);
		setInCart(true);
		cart ? dispatch(addToCart(props)) : dispatch(setCart(props));
	}, [cart, inCart]);


	useEffect(() => {
		const inCart = cart.some(item => item._id === id);
		inCart && setInCart(true);
	}, [])

	return (
		<div
			className='good-item'
			ref={cardRef}
			onMouseEnter={(e) => {
				rotateCard(e);
				setOnMouse(true);
			}}
			onMouseLeave={() => setOnMouse(false)}
			style={{
				transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
			}}
		>
			<div
				className='good-item__back-anim'
				style={{
					visibility: onMouse ? 'visible' : 'hidden',
					transition: 'visibility 0.3s ease-in-out',
				}}
			></div>
			<div className='good-item__image-wrapper'>
				<div className='good-item__corner'></div>
					<div
						className='image-fav'
						onClick={handleFav}
						style={{
							backgroundImage: checkFav()
								? `url(${imageFavActive})`
								: `url(${imageFav})`,
						}}
					></div>
					<div
						className='image-cart'
						onClick={handleCartClick}
						style={{
							backgroundImage: checkInCart()
								? `url(${cartIconActive})`
								: `url(${cartIcon})`,
						}}
					></div>
				<img 
					className='good-item__image' 
					src={image} 
					alt='Picture'
				/>
			</div>
			<div className='good-item__base'>
				<div className='good-item__base-text-wrapper'>
					<p className='good-item__name'>{name}</p>
					<p className='good-item__brand'>{brand}</p>
				</div>
				<div className='good-item__rating'>
					<div className='stars'>{rating}*</div>
					<p>Reviews</p>
				</div>
				<p className='good-item__price'>{price}$</p>
				<div
					className='good-item__buy-wrapper'
					style={{
						backgroundColor: ((onBuy && inCart) || inCart) && '#03b17a' || onBuy && '#d901c366',
					}}
					onMouseOver={() => {
						setOnBuy(true)
					}}
					onMouseLeave={() => setOnBuy(false)}
					onClick={() => {
						handleCartClick();
					}}
				></div>
				<p
					className='good-item__buy-text'
					onMouseOver={() => {
						setOnBuy(true);
					}}
					onMouseLeave={() => setOnBuy(false)}
					onClick={() => {
						handleCartClick();
					}}
				>
					BUY
				</p>
			</div>
		</div>
	);
};

export default GoodItem;
