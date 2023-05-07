import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/Api';

import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';

import Header from '../Header';
import SideMenu from '../SideMenu';

// POPUPS
import CreateGoodPopup from './components/CreateGoodPopup/CreateGoodPopup';

const Layout = (props) => {
	const isCreatePopupOpen = useSelector(
		(state) => state.createGoodPopup.isOpen
	);

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
			{isCreatePopupOpen && <CreateGoodPopup props={props} />}
			<Header />
			<SideMenu />
		</>
	);
};

export default Layout;
