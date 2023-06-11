import { useCallback, useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from '../../redux/slices/popups/createGoodPopup';

import Layout from '../Layout/Layout';
import Good from './components/Good/Good';
import User from './components/User/User';

// TYPES
import { RootState } from 'redux/store';

const Admin: FC = () => {
	const goods = useSelector((state: RootState) => state.goods.goods);
	const users = useSelector((state: RootState) => state.users.users);
	const dispatch = useDispatch();

	const [input, setInput] = useState<string>('');

	const handleCreateGood = useCallback((): void => {
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
							return <Good key={good._id} {...good} />
						}))
						: (goods.filter(good => {
							return good.name.toLowerCase().includes(input.toLowerCase())}).map(item => <Good key={item._id} {...item} />)
						)}
        </div>
				<div className='users-list'>
          {users.map(user => {
            return <User key={user._id} {...user} />
          })}
        </div>
			</div>
		</>
	);
};

export default Admin;