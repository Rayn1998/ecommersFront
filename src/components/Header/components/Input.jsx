const Input = () => {
	return (
		<div className='input'>
			<select className='dropdown'>
				<option className='list-option' value='1'>
					All
				</option>
				<option className='list-option' value='2'>
					option2
				</option>
				<option className='list-option' value='3'>
					option3
				</option>
				<option className='list-option' value='4'>
					option4
				</option>
				<option className='list-option' value='5'>
					option5
				</option>
			</select>

			<input />
			<button className='search-btn' type='button' />
		</div>
	);
};

export default Input;