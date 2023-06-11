import { useCallback, FC } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import particlesConfig from '../../particlesjs-config.json';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
//////////////////////////

import { useEffect, useState } from 'react';
import { api } from '../../utils/Api';
import { useDispatch } from 'react-redux';
import { setGoods } from '../../redux/slices/goodsSlice';
import { setUser } from '../../redux/slices/userSlice';
import { setUsers } from '../../redux/slices/usersSlice';
import { setCart } from '../../redux/slices/cartSlice';

import Main from '../Main/Main';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';
import Profile from '../Profile/Profile';
import Admin from '../Admin/Admin';
import Favourites from '../Favourites/Favourites';
import Payment from '../Payment/Payment';
import GoodPage from '../GoodPage/GoodPage';

const App: FC = () => {
	const [onParticles, setOnParticles] = useState<boolean>(false);
	const [onButtonsHover, setOnButtonsHover] = useState<boolean>(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		let cart;
		if (!localStorage.getItem('token')) {
			navigate('/sign-in');
		} else {
			api
				.getUserData()
				.then((res) => {
					dispatch(setUser({ ...res }));
				})
				.catch((err) => console.log(err));

			api
				.getGoods()
				.then((res) => {
					dispatch(setGoods(res.data));
				})
				.catch((err) => console.log(err));

			api
				.getUsers()
				.then((res) => {
					dispatch(setUsers(res.data));
				})
				.catch((err) => console.log(err));

			cart = JSON.parse(localStorage.getItem('cart'));
			cart && dispatch(setCart(cart));
		}
	}, [localStorage.getItem('token')]);

	// PARTICLES ///////////////////////////
	const handleParticles = useCallback(() => {
		setOnParticles(!onParticles);
	}, [onParticles]);

	const handleButtonsHover = useCallback(() => {
		!onButtonsHover 
			? setOnButtonsHover(true)
			: setTimeout(() => setOnButtonsHover(false), 1000);
	}, [onButtonsHover]);

	const particlesInit = useCallback(async (engine) => {
		await loadFull(engine);
	}, []);

	const particlesLoaded = useCallback(async (container) => {
		// await console.log(container);
	}, []);

	return (
		<>
			<div
				className='app'
				style={{
					backgroundColor: !onParticles && '#10041e',
				}}
			>
				<div 
					className='buttons__arrow'
					style={{
						transform: onButtonsHover ? 'translateX(-10rem)' : 'translateX(0)'
					}}
				></div>
				<div 
					className='buttons__hover'
					onMouseEnter={handleButtonsHover}
					onMouseLeave={handleButtonsHover}
					style={{
						opacity: onButtonsHover && 1,
					}}
				>
					<button
						className='particles-switcher'
						type='button'
						onClick={handleParticles}
						style={{
							transform: onButtonsHover ? 'translateX(0)' : 'translateX(-10rem)'
						}}
					></button>
				</div>

				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/sign-up' element={<SignUp />} />
					<Route path='/sign-in' element={<SignIn />} />
					<Route path='/profile' element={<Profile />} />
					<Route path='/admin' element={<Admin />} />
					<Route path='/favourites' element={<Favourites />} />
					<Route path='/payment' element={<Payment />} />
					<Route path='/item/:id' element={<GoodPage />} />
				</Routes>
			</div>
			{/* {onParticles && (
				<Particles
					id='particles'
					init={particlesInit}
					loaded={particlesLoaded}
					options={particlesConfig}
				/>
			)} */}
		</>
	);
};

export default App;
