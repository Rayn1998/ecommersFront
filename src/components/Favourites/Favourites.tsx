import { FC } from 'react';
import { useSelector } from 'react-redux';

import Layout from '../Layout/Layout';
import ItemsContainer from '../ItemsContainer/ItemsContainer';
import GoodItem from '../GoodItem/GoodItem';

// TYPES
import { RootState } from 'redux/store';

const Favourites: FC = () => {
	const userFavourites = useSelector((state: RootState) => state.user.data.favourites);

	return (
		<>
			<Layout />
			<ItemsContainer>
				{userFavourites.length === 0 ? (
					<p className='no-favs'>There are no favourites yet...</p>
				) : (
					userFavourites.map((fav) => <GoodItem key={fav._id} {...fav} />)
				)}
			</ItemsContainer>
		</>
	);
};

export default Favourites;
