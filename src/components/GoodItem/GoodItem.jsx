import { useCallback, useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavourite, removeFavourite } from '../../redux/slices/userSlice';
import { api } from '../../utils/Api';

import imageFav from '../../assets/images/heart_icon.png';
import imageFavActive from '../../assets/images/heart_icon_active.png';

const GoodItem = ({ props }) => {
	const userFavs = useSelector((state) => state.user.data.favourites);
	const dispatch = useDispatch();
	const { name, brand, categorie, image, rating, price, _id: id } = props;

  const checkFav = useCallback(() => {
    return userFavs.some(fav => fav._id === id);
  }, [userFavs]);

	const handleFav = useCallback(() => {
		if (checkFav()) {
			api
				.removeFavourite(id)
				.then(() => {
					dispatch(removeFavourite(props));
				})
				.catch((err) => console.log(err));
		} else {
			api
				.addFavourite(id)
				.then(() => {
					dispatch(addFavourite(props));
				})
				.catch((err) => console.log(err));
		}
	}, [userFavs]);

	return (
		<div className='good-item'>
			<div className='good-item__image-wrapper'>
				<img className='good-item__image' src={image} alt='Picture' />
				<div
					className='image-fav'
					onClick={handleFav}
					style={{
						backgroundImage: checkFav()
							? `url(${imageFavActive})`
							: `url(${imageFav})`,
						// opacity: isFav ? 0.5 : 1,
					}}
				></div>
				<div className='image-cart'></div>
				<div></div>
			</div>
			<div className='good-item__base'>
				<p className='good-item__name'>{name}</p>
				<p className='good-item__brand'>{brand}</p>
				<div className='good-item__rating'>
					<div className='stars'>{rating}*</div>
					<p>Reviews</p>
				</div>
				<p className='good-item__price'>{price}$</p>
			</div>
		</div>
	);
};

export default GoodItem;
