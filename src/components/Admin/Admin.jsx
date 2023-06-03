import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from '../../redux/slices/popups/createGoodPopup';

import Layout from '../Layout/Layout';
import Good from './components/Good/Good';
import User from './components/User/User';

const Admin = () => {
	const goods = useSelector(state => state.goods.goods);
	const users = useSelector(state => state.users.users);
	const dispatch = useDispatch();
	// console.log(goods)

	const [input, setInput] = useState('');

	const handleCreateGood = useCallback(() => {
		dispatch(setOpen('create'));
	}, []);
	return (
		<>
			<Layout />
			<div className='admin'>
				<div className='goods-list'>
					<div className='goods-list__navigation'>
						<button 
							className='goods-list__navigation-add'
							type='button' 
							onClick={handleCreateGood}
						>Create new good</button>
						<input 
							placeholder='Search...' className='goods-list__navigation-search' 
							value = {input}
							onChange = {(e) => setInput(e.target.value)}
						/>
					</div>
					{input === ''
						? (goods.map(good => {
							return <Good key={good._id} props={good} />
						}))
						: (goods.filter(good => {
							return good.name.toLowerCase().includes(input.toLowerCase())}).map(item => <Good key={item._id} props={item} />)
						)}
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
