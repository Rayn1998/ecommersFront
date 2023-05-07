import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from '../../redux/slices/popups/createGoodPopup';

import Layout from '../Layout/Layout';
import Good from './components/Good/Good';
import User from './components/User/User';

const Admin = () => {
	const goods = useSelector(state => state.goods.goods);
	const users = useSelector(state => state.users.users);
	const dispatch = useDispatch();

	const handleCreateGood = useCallback(() => {
		dispatch(setOpen());
	}, []);
	return (
		<>
			<Layout />
			<div className='admin'>
				<div className='goods-list'>
					<input 
						type='button' 
						value='Create new good' 
						onClick={handleCreateGood}
					/>
          {goods.map(good => {
            return <Good key={good._id} props={good} />
          })}
        </div>
				<div className='users-list'>
          {users.map(user => {
            return <User key={user._id} props={user} />
          })}
        </div>
			</div>
		</>
	);
};

export default Admin;
