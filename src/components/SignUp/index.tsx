import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { redirect } from 'react-router-dom'
import { api } from '../../utils/Api';
  
interface IFormInput {
	name: string;
	email: string;
	password: string;
}

const SignUp: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>();

	const onSubmit: SubmitHandler<IFormInput> = (data: object) => {
		api.signUp(data).then((res) => console.log(res));
	};

	return (
		<div className='signup'>
			<form className='signup__form' onSubmit={handleSubmit(onSubmit)}>
				<h2 className='signup__form-header'>Create account</h2>
				{/* INPUT NAME */}
				<div>
					<p className='signup__form-input-heading'>Name</p>
					<div>
						<input
							className='signup__form-input'
							{...register('name', {
								required: 'Name is required',
								minLength: { value: 3, message: 'The minimum length is 3' },
							})}
							placeholder='Name'
						/>
						<p className='signup__form-input-error'>{errors.name?.message}</p>
					</div>
				</div>
				{/* INPUT EMAIL */}
				<div>
					<p className='signup__form-input-heading'>Email</p>
					<div>
						<input
							className='signup__form-input'
							{...register('email', {
								required: 'Email is required',
								pattern: {
									value: /^[a-z0-9]{3,}@[a-z]{2,}\.[a-z]{2,}/,
									message: 'Email is incorrect',
								}
							})}
							placeholder='Email'
						/>
						<p className='signup__form-input-error'>{errors.email?.message}</p>
					</div>
				</div>
				{/* INPUT PASSWORD */}
				<div>
					<p className='signup__form-input-heading'>Password</p>
					<div>
						<input
							className='signup__form-input'
							{...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 symbols' } })}
							type='password'
							placeholder='Password'
						/>
						<p className='signup__form-input-error'>
							{errors.password?.message}
						</p>
					</div>
				</div>
				{/* INPUT SUBMIT */}
				<div className='signup__form-submit-wrapper'>
					<input className='signup__form-submit' type='submit' />
					<p className='signin'>Sing In</p>
				</div>
			</form>
		</div>
	);
};

export default SignUp;
