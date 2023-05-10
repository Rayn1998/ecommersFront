import { useCallback } from 'react';
import { api } from '../../../../utils/Api';

import { useDispatch } from 'react-redux';
import { filterGoods } from '../../../../redux/slices/goodsSlice';
import { setOpen } from '../../../../redux/slices/popups/createGoodPopup';
import { setCache } from '../../../../redux/slices/cacheSlice';

const Good = ({ props }) => {
	const dispatch = useDispatch();
	const handleXClick = useCallback(() => {
		api
			.deleteGood(props._id)
			.then((res) => {
				dispatch(filterGoods(res));
			})
			.catch((err) => console.log(err));
	}, []);
	const handleChangeClick = useCallback(() => {
    dispatch(setCache(props));
		dispatch(setOpen('change'));
	}, []);
	return (
		<div className='good'>
			<img className='good-img' src={props.image} alt={props.name} />
			<div className='good-text'>
				<p className='good-name'>Name: {props.name}</p>
				<p className='good-brand'>Brand: {props.brand}</p>
			</div>
			<button className='good-change-btn' onClick={handleChangeClick}>
				Change data
			</button>
			<input type='button' value='X' onClick={handleXClick} />
		</div>
	);
};

export default Good;
