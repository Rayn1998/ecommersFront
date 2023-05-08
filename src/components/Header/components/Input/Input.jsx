import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setInput } from "../../../../redux/slices/inputSlice";

const Input = ({props}) => {
	const input = useSelector(state => state.input.input);
	const dispatch = useDispatch();

	const handleChange = useCallback((e) => {
		dispatch(setInput(e.target.value));
	}, [])
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

			<input className="input-type" value={input} onChange={handleChange} />
			<button className='search-btn' type='button' />
		</div>
	);
};

export default Input;
