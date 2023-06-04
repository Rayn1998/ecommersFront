import { useCallback, useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUserDefault } from '../../redux/slices/userSlice';

import mainLogo from '../../assets/images/logo.png';
import imageFav from '../../assets/images/fav.png';
import imageFavActive from '../../assets/images/fav_active.png';
import cartIcon from '../../assets/images/cartIcon.png';
import cartIcon_active from '../../assets/images/cartIcon_active.png';
import accIcon from '../../assets/images/profile_imagejpg.jpg';

import Input from './components/Input/Input';
import Cart from './components/Cart/Cart';

const Header = () => {
	const user = useSelector((state) => state.user.data);
	const cart = useSelector((state) => state.cart.data);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const [hover, setHover] = useState(false);
	const [isCartOpen, setIsCartOpen] = useState(false);

	const checkFav = useCallback(() => {
		return user.favourites.length > 0;
	}, [user]);

	const checkCart = useCallback(() => {
		return cart.length > 0;
	}, [cart]);

	const handleLogOut = useCallback(() => {
		dispatch(setUserDefault());
		localStorage.removeItem('token');
		navigate('/sign-in');
	}, []);

	const handleProfile = useCallback(() => {
		navigate('/profile');
	}, []);

	const handleAdmin = useCallback(() => {
		navigate('/admin');
	}, []);

	const handleFavourites = useCallback(() => {
		navigate('/favourites');
	}, []);

	const handleCartClick = useCallback(() => {
		setIsCartOpen((state) => !state);
	}, []);

	const handleLogoClick = useCallback(() => {
		location.pathname !== '/' && navigate('/');
	}, [location.pathname]);

	const cartRef = useRef();
	const cartIconRef = useRef();

	const handleMouseOutOfCart = useCallback((e) => {
		if (!cartRef.current.contains(e.target) && !cartIconRef.current.contains(e.target)) setIsCartOpen(false);
	}, [isCartOpen]);

	useEffect(() => {
		document.addEventListener('click', handleMouseOutOfCart);
		return () => document.removeEventListener('click', handleMouseOutOfCart);
	}, []);

	const handleEsc = useCallback((e) => {
		if (e.key === 'Escape') {
			setIsCartOpen(false);
		}
	}, []);

	useEffect(() => {
		document.addEventListener('keydown', handleEsc);
		return () => document.removeEventListener('keydown', handleEsc);
	}, []);

	return (
		<div className='header'>
			<img
				className='header__logo'
				src={mainLogo}
				alt='Amazon Logo'
				onClick={handleLogoClick}
			/>
			{location.pathname === '/' && <Input />}
			<div className='header__icons'>
				<img
					className='header__fav-logo'
					src={checkFav() ? imageFavActive : imageFav}
					alt='Favourites Icon'
					onClick={handleFavourites}
				/>
				<div
					className='header__fav-logo-counter'
					style={{
						visibility: checkFav() ? 'visible' : 'hidden',
						opacity: checkFav() ? 1 : 0,
						transition: 'all 0.3s ease-in-out',
					}}
				>
					{user.favourites.length}
				</div>
				<div className='cart-wrapper'>
					<img
						className='header__cart-icon'
						src={checkCart() ? cartIcon_active : cartIcon}
						alt='Cart Icon'
						onClick={handleCartClick}
						ref={cartIconRef}
					/>
					<div
						className='header__cart-logo-counter'
						style={{
							visibility: checkCart() ? 'visible' : 'hidden',
							opacity: checkCart() ? 1 : 0,
							transition: 'all 0.3s ease-in-out',
						}}
					>
						{cart.length}
					</div>
					<Cart ref={cartRef} isOpen={isCartOpen} />
				</div>

				<div
					className='acc-wrapper'
					onMouseEnter={() => setHover(true)}
					onMouseLeave={() => setHover(false)}
				>
					<img className='header__acc-icon' src={accIcon} alt='Account Icon' />
					<ul
						className='header__acc-menu'
						style={
							hover
								? {
										visibility: 'visible',
										transform: 'translateX(0)',
										opacity: 1,
										filter: 'blur(0)'
								  }
								: {
										visibility: 'hidden',
										transform: 'translateX(-5rem)',
										opacity: 0,
								  }
						}
					>
						<p>
							Welcome back, <strong className='header__acc-name'>{user.name}</strong>
						</p>
						<li onClick={handleProfile}>My profile</li>
						{user.role === 'admin' && (
							<li onClick={handleAdmin}>Admin Pannel</li>
						)}
						<li onClick={handleLogOut}>Logout</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Header;
