import { FC } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

//////////////////////////

import { useEffect } from 'react';
import { api } from '../../utils/Api';
import { useDispatch, useSelector } from 'react-redux';
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
import { RootState } from 'redux/store';

const App: FC = () => {
	const users = useSelector((state: RootState) => state.users.users)

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
					if (res.message) {
						localStorage.removeItem('token');
						navigate('/sign-in');
						return;
					}
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
	}, [localStorage.getItem('token'), users]);

	return (
		<>
			<div
				className='app'
				style={{
					backgroundColor: '#10041e',
				}}
			>
				{/* <div 
					className='buttons__arrow'
					style={{
						transform: onButtonsHover ? 'translateX(-10rem)' : 'translateX(0)',
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
				</div> */}

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
		</>
	);
};

export default App;
