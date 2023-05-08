import { useSelector } from 'react-redux';

import Layout from '../Layout/Layout';
import ItemsContainer from '../ItemsContainer/ItemsContainer';
import GoodItem from '../GoodItem/GoodItem';

const Favourites = () => {
	const userFavourites = useSelector((state) => state.user.data.favourites);
	return (
		<>
			<Layout />
			<ItemsContainer>
				{userFavourites.length === 0 ? (
					<p className='no-favs'>There is no favourites yet...</p>
				) : (
					userFavourites.map((fav) => <GoodItem key={fav._id} props={fav} />)
				)}
			</ItemsContainer>
		</>
	);
};

export default Favourites;
