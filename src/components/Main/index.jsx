import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/Api';

import Header from '../Header';
import SideMenu from '../SideMenu';

import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';

const Main = () => {
	const user = useSelector(state => state.user.data);
  const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleClick = () => {
	  dispatch(setUser({email: 'new email', name: 'new name'}));
	}

	useEffect(() => {
    if (!localStorage.getItem('token')) {
			navigate('/sign-in');
		} else {
			api.getUserData(localStorage.getItem('token')).then(res => {
				dispatch(setUser({...res}));
			});
		}
  }, [localStorage.getItem('token')]);

	return (
		<div className='main'>
			<Header />
			<SideMenu />
			{/* <p style={{ fontSize: 32 }}>{`User is: ${user.name}`}</p>
			<p style={{ fontSize: 32 }}>{`User is: ${user.email}`}</p>
			<button type='button' onClick={handleClick}>
				Change email
			</button> */}
		</div>
	);
};

export default Main;
