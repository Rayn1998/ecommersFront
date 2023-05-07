const FormInput = ({props}) => {
  const { title, register, options, errors } = props;
	return (
		<div className='input'>
			<p>{title}: </p>
			<div className='input-wrapper'>
				<input {...register( `${title.toLowerCase()}`, options)} />
				<p>{errors[title.toLowerCase()]?.message}</p>
			</div>
		</div>
	);
};

export default FormInput;
