import { Route, Routes, useNavigate } from 'react-router-dom';

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

const App = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		let cart;
		console.log('user and goods requests');
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

	return (
		<div className='app'>
			<Routes>
				<Route exact path='/' element={<Main />} />
				<Route path='/sign-up' element={<SignUp />} />
				<Route path='/sign-in' element={<SignIn />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='/admin' element={<Admin />} />
				<Route path='/favourites' element={<Favourites />} />
			</Routes>
		</div>
	);
};

export default App;
