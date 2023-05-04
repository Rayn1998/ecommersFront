import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/Api';
import { emailCheck } from '../../utils/regExpressions';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';

const SignIn = () => {
	// const user = useSelector(state => state.user.data);
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();
	const navigate = useNavigate();

	const onSubmit = (data) => {
		reset();
		api.signIn(data).then((res) => {
			if (!res.message) {
				localStorage.setItem('token', res.token);
				dispatch(setUser({...res}));
				navigate('/');
			} else {
				// TODO: Сделать подсвечивание красным!!!!!!
				console.log(res.message);
			}
		});
	};

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
						/>
						<p className='signup__form-input-error'>
							{errors.password?.message}
						</p>
					</div>
				</div>
				{/* INPUT SUBMIT */}
				<div className='signup__form-submit-wrapper'>
					<input className='signup__form-submit' type='submit' />
					<p className='signin'>Sing Up</p>
				</div>
			</form>
		</div>
	);
};

export default SignIn;
