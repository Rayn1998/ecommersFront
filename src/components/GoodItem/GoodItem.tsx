import { useCallback, useState, useEffect, useRef, FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { addFavourite, removeFavourite } from '../../redux/slices/userSlice';
import {
	addToCart,
	setCart,
	removeFromCart,
} from '../../redux/slices/cartSlice';
import { setCurrentGood } from '../../redux/slices/currentGoodSlice';
import { api } from '../../utils/Api';

import imageFav from '../../assets/images/fav.png';
import imageFavActive from '../../assets/images/fav_active.png';
import cartIcon from '../../assets/images/cartIcon.png';
import cartIconActive from '../../assets/images/cartIcon_active.png';

// TYPES
import IGood from 'types/Good';

const GoodItem: FC = ({ ...props }: IGood) => {
	const navigate = useNavigate();

	const userFavs = useSelector((state: RootState) => state.user.data.favourites);
	const cart = useSelector((state: RootState) => state.cart.data);
	const dispatch = useDispatch();
	const { name, brand, image, rating, price, _id: id } = props;

	const [inCart, setInCart] = useState<boolean>(false);
	const [onBuy, setOnBuy] = useState<boolean>(false);
	const [onMouse, setOnMouse] = useState<boolean>(false);
	const [rotateX, setRotateX] = useState<number>(0);
	const [rotateY, setRotateY] = useState<number>(0);

	const cardRef = useRef<HTMLDivElement>(null);

	const rotateCard = (e: MouseEvent): void => {
		const node = cardRef.current;
		const mult: number = 6;

		const halfWidth = node.offsetWidth / 2;
		const halfHeight = node.offsetHeight / 2;

		const middleX = node.offsetLeft + halfWidth;
		const middleY = node.offsetTop + halfHeight;
		const x = e.clientX - middleX;
		const y = e.clientY - middleY;

		const offsetX = (x / halfWidth) * mult;
		const offsetY = (y / halfHeight) * mult;

		setRotateY(offsetX * -1);
		setRotateX(offsetY);
	};

	const handleMouseOn = (): void => {
		const node = cardRef.current;
		node.addEventListener('mousemove', rotateCard);
	}

	const handleMouseLeave = useCallback((): void => {
		const node = cardRef.current;
		node.removeEventListener('mousemove', rotateCard);
		const interval = setInterval(() => {
			setRotateX(rotateX => ((rotateX *= 0.9) * 1000) / 1000);
			setRotateY(rotateY => ((rotateY *= 0.9) * 1000) / 1000);
		}, 50);
		setTimeout(() => {
			window.clearInterval(interval);
		}, 2000);
	}, []);

	const handleClick = (e) => {
		e.stopPropagation();
		// dispatch(setCurrentGood(props));
		const goodJson = JSON.stringify(props);
		localStorage.setItem('currentGood', goodJson);
		navigate(`/item/:${id}`);
	}

	const checkFav = useCallback((): boolean => {
		return userFavs.some((fav: IGood) => fav._id === id);
	}, [userFavs]);

	const checkInCart = useCallback((): boolean => {
		return cart.some((item) => item._id === id);
	}, [cart]);

	const handleFav = useCallback((e): void => {
		e.stopPropagation();
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

	const handleCartClick = useCallback((e): void => {
		e.stopPropagation();
		if (checkInCart()) {
			dispatch(removeFromCart(props));
			setInCart(false);
			return;
		}
		setOnBuy(false);
		setInCart(true);
		const item = { ...props, amount: 1 };
		cart ? dispatch(addToCart(item)) : dispatch(setCart(item));
	}, [cart, inCart]);


	useEffect((): void => {
		const state = cart.some(item => item._id === id);
		setInCart(state);
	}, [cart]);

	return (
		<div
			className='good-item'
			ref={cardRef}
			onMouseEnter={() => {
				setOnMouse(true);
				handleMouseOn();
			}}
			onMouseLeave={() => {
				setOnMouse(false);
				handleMouseLeave();
			}}
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
			<div className='good-item__image-wrapper' onClick={handleClick}>
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
						backgroundColor: (inCart && '#03b17a') || (onBuy && '#d901c366'),
					}}
					onMouseOver={() => {
						setOnBuy(true)
					}}
					onMouseLeave={() => setOnBuy(false)}
					onClick={handleCartClick}
				></div>
				<p
					className='good-item__buy-text'
					onMouseOver={() => {
						setOnBuy(true);
					}}
					onMouseLeave={() => setOnBuy(false)}
					onClick={handleCartClick}
				>
					BUY
				</p>
			</div>
		</div>
	);
};

export default memo(GoodItem);
