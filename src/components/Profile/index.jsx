import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';
import { set, useForm } from 'react-hook-form';

import { api } from '../../utils/Api';
import Layout from '../Layout/Layout';
import { emailCheck } from '../../utils/regExpressions';

const Profile = () => {
	const user = useSelector((state) => state.user.data);
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		values: {
			name: user.name,
			email: user.email,
			role: user.role,
		},
	});

	const onSubmit = (data) => {
		api.updateUser(data, user._id)
			.then(res => dispatch(setUser(res.data)))
			.catch(err => console.log(err));
	};

	return (
		<>
			<Layout />
			<div className='profile-area'>
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
					<input className='form__submit-btn' type='submit' value='Change profile data' />
				</form>
			</div>
		</>
	);
};

export default Profile;
