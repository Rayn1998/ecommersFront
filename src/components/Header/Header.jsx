import amazonLogo from '../../assets/images/amazon_logo.png';
import favourites_icon from '../../assets/images/heart_icon.png';
import favourites_icon_active from '../../assets/images/heart_icon_active.png';
import cart_icon from '../../assets/images/cart_icon.png';
import cart_icon_active from '../../assets/images/cart_icon_active.png';
import accIcon from '../../assets/images/profile_imagejpg.jpg';

import { useSelector, useDispatch } from 'react-redux';
import { setUserDefault } from '../../redux/slices/userSlice';
import { useCallback, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Input from './components/Input/Input';
import Cart from './components/Cart/Cart';

const Header = () => {
	const user = useSelector((state) => state.user.data);
	const cart = useSelector((state) => state.cart.data);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const [hover, setHover] = useState(false);
	const [input, setInput] = useState('');
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
	return (
		<div className='header'>
			<img
				className='header__logo'
				src={amazonLogo}
				alt='Amazon Logo'
				onClick={() => navigate('/')}
			/>
			{location.pathname === '/' && <Input props={{ input, setInput }} />}
			<div className='header__icons'>
				<img
					className='header__fav-logo'
					src={checkFav() ? favourites_icon_active : favourites_icon}
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
						src={checkCart() ? cart_icon_active : cart_icon}
						alt='Cart Icon'
						onClick={handleCartClick}
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
					<Cart isOpen={isCartOpen} />
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
								  }
								: {
										visibility: 'hidden',
										transform: 'translateX(-5rem)',
										opacity: 0,
								  }
						}
					>
						<p>
							Welcome back, <strong>{user.name}</strong>
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
