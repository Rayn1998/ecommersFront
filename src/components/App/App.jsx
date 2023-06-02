import { useRef } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

// import 'bootstrap/dist/css/bootstrap.min.css'

import { useEffect } from 'react';
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
import { useCallback } from 'react';

const App = () => {
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

	const appRef = useRef();

	// const rain = useCallback((amount) => {
	// 	const node = appRef.current;
	// 	let i = 0;
	// 	while (i < amount) {
	// 		const drop = document.createElement('i');

	// 		const size = Math.random();
	// 		const posX = Math.floor(Math.random() * window.innerWidth);
	// 		const delay = Math.random() * -20;
	// 		const duration = Math.random() * 20;

	// 		drop.style.width = 5 + size + 'px';
	// 		drop.style.left = posX + 'px';
	// 		drop.style.animationDelay = delay + 's';
	// 		drop.style.animationDuration = duration + 1 + 's';

	// 		node.appendChild(drop);
	// 		i++;
	// 	}
	// }, []);

	// useEffect(() => {
	// 	window.addEventListener('resize', rain);
	// 	return () => {
	// 		window.removeEventListener('resize', rain);
	// 	};
	// }, [rain]);

	// useEffect(() => {
	// 	rain(50);
	// }, []);

	return (
		<div className='app' ref={appRef}>
			<Routes>
				<Route exact path='/' element={<Main />} />
				<Route path='/sign-up' element={<SignUp />} />
				<Route path='/sign-in' element={<SignIn />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='/admin' element={<Admin />} />
				<Route path='/favourites' element={<Favourites />} />
				<Route path='/payment' element={<Payment />} />
			</Routes>
		</div>
	);
};

export default App;
