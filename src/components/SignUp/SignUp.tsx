import { useCallback, FC } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/Api';
import { emailCheck } from '../../utils/regExpressions';

// TYPES
import IFormValues from 'types/SignUpForm';

const SignUp: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormValues>();

	const navigate = useNavigate();

	const onSubmit = useCallback((data) => {
		api.signUp(data).then(() => {
			console.log('Thanks for the registration)!');
			navigate('/sign-in');
		});
	}, []);

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
									value: emailCheck,
									message: 'Email is incorrect',
								},
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
							{...register('password', {
								required: 'Password is required',
								minLength: {
									value: 8,
									message: 'Password must be at least 8 symbols',
								},
							})}
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
					<p className='signin' onClick={() => navigate('/sign-in')}>
						Sing In
					</p>
				</div>
			</form>
		</div>
	);
};

export default SignUp;
