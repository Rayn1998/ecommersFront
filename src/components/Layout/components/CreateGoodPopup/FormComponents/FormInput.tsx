import { FC } from 'react';

import IFormProps from 'types/FormProps';

const FormInput: FC<IFormProps> = ({ props }) => {
  const { title, register, options, errors } = props;
	return (
		<div className='form-input'>
			<p className="form-input__name">{title}: </p>
			<div className='input-wrapper'>
				<input 
					className='form-input__input'
					{...register( `${title.toLowerCase()}`, options)} 
				/>
				<p>{errors[title.toLowerCase()]?.message}</p>
			</div>
		</div>
	);
};

export default FormInput;
