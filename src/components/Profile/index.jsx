import { useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import Layout from '../Layout/Layout';

const Profile = () => {
	const user = useSelector((state) => state.user.data);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			name: user.name,
		}
	});


	// useEffect(() => {
	// 	refName.current.value = user.name;
	// 	refEmail.current.value = user.email;
	// 	refRole.current.value = user.role;
	// }, [user]);
	return (
		<>
			<Layout />
			<div className='profile-area'>
				<form>
					<div className='field-wrapper'>
						<p>Name:</p>
						<input
							{...register('name', { required: 'Name is required' })}
						></input>
					</div>
					<div className='field-wrapper'>
						<p>Email:</p>
						<input ></input>
					</div>
					<div className='field-wrapper'>
						<p>Role:</p>
						<input ></input>
					</div>
				</form>
			</div>
		</>
	);
};

export default Profile;
