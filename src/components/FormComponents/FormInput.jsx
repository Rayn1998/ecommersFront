const FormInput = ({props}) => {
  const { title, register, options, errors } = props;
	return (
		<div className='form-input'>
			<p className="form-input__name">{title}: </p>
			<div className='input-wrapper'>
				<input 
					{...register( `${title.toLowerCase()}`, options)} 
					className='form-input__input'
				/>
				<p>{errors[title.toLowerCase()]?.message}</p>
			</div>
		</div>
	);
};

export default FormInput;
