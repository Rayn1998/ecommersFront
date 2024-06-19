import { useForm } from 'react-hook-form';
import { useEffect, useCallback, FC } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setClose } from '../../../../redux/slices/popups/createGoodPopup';
import { addOneGood, changeGood } from '../../../../redux/slices/goodsSlice';
import { removeCache } from '../../../../redux/slices/cacheSlice';

import { api } from '../../../../utils/Api';
import Popup from '../Popup/Popup';
import FormInput from './FormComponents/FormInput';

// TYPES
import { RootState } from 'redux/store';
import IFormProps from 'types/FormProps';

const CreateGoodPopup: FC = () => {
	const isOpen = useSelector(
		(state: RootState) => state.createGoodPopup.isOpen
	);
	const type = useSelector((state: RootState) => state.createGoodPopup.type);
	const cache = useSelector((state: RootState) => state.cache.data);
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormProps>({
		defaultValues: cache,
	});

	const handleCloseClick = useCallback((): void => {
		dispatch(setClose());
		dispatch(removeCache());
	}, []);

	const onSubmit = useCallback((data): void => {
		if (type === 'create') {
			api
				.createGood(data)
				.then((res) => {
					dispatch(addOneGood(res.data));
					handleCloseClick();
				})
				.catch((err) => console.log(err));
		} else if (type === 'change') {
			const { rating, __v, ...other } = data;
			api
				.updateGood(other)
				.then((res) => {
					dispatch(changeGood(res));
					handleCloseClick();
				})
				.catch((err) => console.log(err));
		}
	}, []);

	const handleEscClose = useCallback((e): void => {
		e.key === 'Escape' && handleCloseClick();
	}, []);

	useEffect(() => {
		document.addEventListener('keydown', handleEscClose);
		return () => document.removeEventListener('keydown', handleEscClose);
	}, [isOpen]);

	return (
		<Popup props={{
				popupName: 'Create new goodpopupName',
			}}
		>
			<form className='popup-form' onSubmit={handleSubmit(onSubmit)}>
				{/* NAME */}
				<FormInput
					props={{
						title: 'Name',
						register,
						options: {
							required: 'Name is required',
							minLength: {
								value: 3,
								message: 'Minimum length is 3',
							},
						},
						errors,
					}}
				/>
				{/* BRAND */}
				<FormInput
					props={{
						title: 'Brand',
						register,
						options: {
							required: 'Brand is required',
							minLength: {
								value: 3,
								message: 'Minimum length is 3',
							},
						},
						errors,
					}}
				/>
				{/* CATEGORIE */}
				<FormInput
					props={{
						title: 'Categorie',
						register,
						options: {
							required: 'Categorie is required',
							minLength: {
								value: 3,
								message: 'Minimum length is 3',
							},
						},
						errors,
					}}
				/>
				{/* IMAGE */}
				<FormInput
					props={{
						title: 'Image',
						register,
						options: {
							required: 'Image is required',
							minLength: {
								value: 3,
								message: 'Minimum length is 3',
							},
						},
						errors,
					}}
				/>
				{/* PRICE */}
				<FormInput
					props={{
						title: 'Price',
						register,
						options: {
							required: 'Price is required',
							minLength: {
								value: 1,
								message: 'Minimum length is 1',
							},
						},
						errors,
					}}
				/>
				<button type='submit' className='popup-form__submit-btn'>
					Apply
				</button>
			</form>
		</Popup>
	);
};

export default CreateGoodPopup;
