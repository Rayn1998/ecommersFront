import { useForm } from 'react-hook-form';
import { useEffect, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from '../../../../redux/slices/popups/createGoodPopup';
import { addOneGood } from '../../../../redux/slices/goodsSlice';

import { api } from '../../../../utils/Api';
import FormInput from '../../../FormComponents/FormInput';

const CreateGoodPopup = () => {
	const isOpen = useSelector((state) => state.createGoodPopup.isOpen);
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = useCallback((data) => {
		api
			.createGood(data)
			.then((res) => {
				dispatch(addOneGood(res.data));
				dispatch(setOpen());
			})
			.catch((err) => console.log(err));
	}, []);

	const handleCloseClick = useCallback(() => {
		dispatch(setOpen());
	}, []);

	const handleEscClose = useCallback((e) => {
		e.key === 'Escape' && dispatch(setOpen());
	}, []);

	useEffect(() => {
		document.addEventListener('keydown', handleEscClose);
		return () => document.removeEventListener('keydown', handleEscClose);
	}, [isOpen]);

	return (
		<div className='popup'>
			<div className='popup-container'>
				<button
					className='popup-close-btn'
					type='button'
					onClick={handleCloseClick}
				>
					X
				</button>
				<p className='popup-title'>Create new good</p>
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
					<input type='submit' value='Create' />
				</form>
			</div>
		</div>
	);
};

export default CreateGoodPopup;
