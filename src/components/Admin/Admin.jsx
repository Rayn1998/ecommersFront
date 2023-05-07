import { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { setOpen } from '../../redux/slices/popups/createGoodPopup';

import { api } from '../../utils/Api';
import Layout from '../Layout/Layout';
import Good from './components/Good/Good';
import User from './components/User/User';

const Admin = () => {
	const dispatch = useDispatch();

	const [goods, setGoods] = useState([]);
  const [users, setUsers] = useState([]);

	const handleCreateGood = () => {
		dispatch(setOpen());
	}

	useEffect(() => {
		api
			.getGoods()
			.then((res) => setGoods(res.data))
			.catch((err) => console.log(err));

    api
      .getUsers()
      .then((res) => setUsers(res.data))
			.catch((err) => console.log(err));
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
