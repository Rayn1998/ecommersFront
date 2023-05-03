import Header from '../Header';

import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';

const Main = () => {
	const user = useSelector(state => state.user.data);
  const dispatch = useDispatch();

	const handleClick = () => {
	  dispatch(setUser({email: 'new email', name: 'new name'}));
	}

	return (
		<div className='main'>
			<Header />
			<p style={{ fontSize: 32 }}>{`User is: ${user.name}`}</p>
			<p style={{ fontSize: 32 }}>{`User is: ${user.email}`}</p>
			<button type='button' onClick={handleClick}>
				Change email
			</button>
		</div>
	);
};

export default Main;
