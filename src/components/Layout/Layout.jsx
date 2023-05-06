import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/Api';

import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';

import Header from '../Header';
import SideMenu from '../SideMenu';

const Layout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!localStorage.getItem('token')) {
			navigate('/sign-in');
		} else {
			api.getUserData().then((res) => {
				dispatch(setUser({ ...res }));
			});
		}
	}, [localStorage.getItem('token')]);

	return (
		<>
			<Header />
			<SideMenu />
		</>
	);
};

export default Layout;
