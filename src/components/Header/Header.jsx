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

import Input from './components/Input';

const Header = () => {
	const user = useSelector((state) => state.user.data);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const [hover, setHover] = useState(false);
	const [input, setInput] = useState('');

	const checkFav = useCallback(() => {
    return user.favourites.length > 0;
  }, [user]);

	const handleLogOut = useCallback(() => {
		dispatch(setUserDefault());
		localStorage.clear();
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
				<img className='header__cart-icon' src={cart_icon} alt='Cart Icon' />
				<div
					className='acc-wrapper'
					onMouseEnter={() => setHover(true)}
					onMouseLeave={() => setHover(false)}
				>
					<img className='header__acc-icon' src={accIcon} alt='Account Icon' />
					<ul
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
						<p>Welcome back, {user.name}</p>
						<li onClick={handleProfile}>My profile</li>
						{user.role === 'admin' && <li onClick={handleAdmin}>Admin Pannel</li>}
						<li onClick={handleLogOut}>Logout</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Header;
