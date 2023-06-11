import { useCallback, useEffect, useState, useRef, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInput } from '../../../../redux/slices/inputSlice';

// TYPES
import { RootState } from 'redux/store';

const Input: FC = () => {
	const input = useSelector((state: RootState) => state.input.input);
	const dispatch = useDispatch();

	const [dropdownShow, setDropdownShow] = useState<boolean>(false);
	const [onInput, setOnInput] = useState<boolean>(false);

	const handleDropdown = useCallback((e) => {
		dropdownShow
			? setDropdownShow(false)
			: setDropdownShow(true)
	}, [dropdownShow]);

	const handleChange = useCallback((e) => {
		dispatch(setInput(e.target.value));
	}, []);

	const dropDownRef = useRef<HTMLDivElement>(null);

	const handleOutClick = useCallback((e) => {
		if (!dropDownRef.current.contains(e.target)) setDropdownShow(false);
	}, []);

	const handleEsc = useCallback((e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			setDropdownShow(false);
		}
	}, []);

	useEffect(() => {
		document.addEventListener('click', handleOutClick);
		document.addEventListener('keydown', handleEsc);
		return () => {
			document.removeEventListener('click', handleOutClick);
			document.removeEventListener('keydown', handleEsc);
		}
	}, []);

	return (
		<div className='input'>
			<div 
				ref={dropDownRef}
				className='dropdown'
				onClick={handleDropdown}
				style={{
					boxShadow: (onInput || dropdownShow) && 'inset 0 0 2rem #00bcd4',
					outline: (onInput || dropdownShow) && '0.1rem solid #00bcd4',
				}}
			>All
				<ul 
					className='dropdown-list'
					style={{
						transform: dropdownShow && 'translateY(0)',
						filter: dropdownShow && 'blur(0)',
						opacity: dropdownShow && 1,
						visibility: dropdownShow ? 'visible' : 'hidden',
					}}
				>
					<li 
						className='list-item' 
						value='1'
					>
						All
					</li>
					<li className='list-item' value='2'>
						option2
					</li>
					<li className='list-item' value='3'>
						option3
					</li>
					<li className='list-item' value='4'>
						option4
					</li>
					<li className='list-item' value='5'>
						option5
					</li>
				</ul>
			</div>

			<input 
				className='input-type' 
				value={input} 
				onChange={handleChange} 
				onFocus={() => setOnInput(true)}
				onBlur={() => setOnInput(false)}
			/>
			<button 
				className='search-btn' 
				type='button' 
				style={{
					backgroundColor: onInput && '#007a8a86',
					outline: onInput && '0.1rem solid #00bcd4',
				}}
				onClick={() => dispatch(setInput(''))}
			/>
		</div>
	);
};

export default Input;
