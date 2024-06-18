import { useState, useCallback, FC, CSSProperties } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/Api';
import { emailCheck } from '../../utils/regExpressions';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';

// TYPES
import IFormValues from 'types/SignUpForm';

const SignIn: FC = () => {
	const [errStateMsg, setErrStateMsg] = useState<string>('Error');
	const [visibState, setVisibState] = useState<boolean>(true);
	const [blicker, setBlicker] = useState<boolean>(false);
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IFormValues>();
	const navigate = useNavigate();

	const onSubmit = useCallback((data) => {
		reset();
		api.signIn(data).then((res) => {
			if (!res.message) {
				localStorage.setItem('token', res.token);
				dispatch(setUser({...res}));
				navigate('/');
			} else {
				// TODO: Сделать подсвечивание красным!!!!!!
				setErrStateMsg(res.message);
				blick();
				setVisibState(true);
				setTimeout(() => setVisibState(false), 3000);
			}
		});
	}, []);

	const blick = useCallback(() => {
		setBlicker(true);
		setTimeout(() => setBlicker(false), 500);
		setTimeout(() => setBlicker(true), 1000);
		setTimeout(() => setBlicker(false), 1500);
	}, []);

	return (
		<div className='signup'>
			<form className='signup__form' onSubmit={handleSubmit(onSubmit)}>
				<h2 className='signup__form-header'>Enter your account</h2>
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
							style={{
								borderColor: blicker ? 'red' : '',
							}}
						/>
						<p className='signup__form-input-error'>
							{errors.password?.message}
						</p>
					</div>
				</div>
				{/* INPUT SUBMIT */}
				<div className='signup__form-submit-wrapper'>
					<input 
						className='signup__form-submit' 
						type='submit'
						value={visibState ? 'Error' : 'Submit'}
						style={{
							backgroundColor: visibState ? '#b12704' : '',
						}}
					/>
					<p 
						className='signin' 
						onClick={() => navigate('/sign-up')}
					>
						Sing Up
					</p>
				</div>
			</form>
		</div>
	);
};

export default SignIn;
