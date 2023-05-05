import amazonLogo from '../../assets/images/amazon_logo.png';
import favourites_icon from '../../assets/images/favourites_icon.svg';
import cart_icon from '../../assets/images/cart_icon.png';
import accIcon from '../../assets/images/profile_imagejpg.jpg';

import { useSelector, useDispatch } from 'react-redux';
import { setUserDefault } from '../../redux/slices/userSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from './components/Input';

const Header = () => {
	const user = useSelector((state) => state.user.data);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [hover, setHover] = useState(false);
	const [input, setInput] = useState('');

	const handleLogOut = () => {
		dispatch(setUserDefault());
		localStorage.clear();
	};
	const handleProfile = () => {
		navigate('/profile');
	};

	return (
		<div className='header'>
			<img
				className='header__logo'
				src={amazonLogo}
				alt='Amazon Logo'
				onClick={() => navigate('/')}
			/>
			<Input props={{ input, setInput }} />
			<div className='header__icons'>
				<img
					className='header__fav-logo'
					src={favourites_icon}
					alt='Favourites Icon'
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
						<li onClick={handleLogOut}>Logout</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Header;
