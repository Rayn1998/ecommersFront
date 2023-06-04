import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';
import { useForm } from 'react-hook-form';

import { api } from '../../utils/Api';
import Layout from '../Layout/Layout';
import { emailCheck } from '../../utils/regExpressions';

import profileAvatar from '../../assets/images/profile_imagejpg.jpg';

const Profile = () => {
	const user = useSelector((state) => state.user.data);
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		values: {
			name: user.name,
			email: user.email,
			role: user.role,
		},
	});

	const onSubmit = useCallback((data) => {
		api
			.updateUser(data, user._id)
			.then((res) => dispatch(setUser(res.data)))
			.catch((err) => console.log(err));
	}, []);

	return (
		<Layout>
			<section className='profile-area'>
				<div className='profile'>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className='field-wrapper'>
							<p>Name:</p>
							<div className='input-wrapper'>
								<input
									{...register('name', {
										required: 'Name is required',
										minLength: {
											value: 2,
											message: 'Minimum length is 2',
										},
									})}
								/>
								<p>{errors.name?.message}</p>
							</div>
						</div>
						<div className='field-wrapper'>
							<p>Email:</p>
							<div className='input-wrapper'>
								<input
									{...register('email', {
										required: 'Email is required',
										pattern: {
											value: emailCheck,
											message: 'Email is incorrect',
										},
									})}
								/>
								<p>{errors.email?.message}</p>
							</div>
						</div>
						<div className='field-wrapper'>
							<p>Role:</p>
							<div className='input-wrapper'>
								<input
									{...register('role', {
										required: 'Role is required',
										pattern: {
											value: /customer|admin/,
											message: `Role may be 'customer' or 'admin'`,
										},
									})}
								/>
								<p>{errors.role?.message}</p>
							</div>
						</div>
						<input
							className='form__submit-btn'
							type='submit'
							value='Change profile data'
						/>
					</form>
					<div className='profile__info-block'>
						<div className='profile__info-img-wrapper'>
							<img 
								className='profile__info-img'
								alt = 'Profile image'
								src = {profileAvatar}
							/>
						</div>
						<p className='profile__info-name'>Name: {user.name}</p>
						<p className='profile__info-email'>Name: {user.email}</p>
						<p className='profile__info-role'>Name: {user.role}</p>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default Profile;
