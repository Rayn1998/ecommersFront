import { useCallback, useEffect, useState, useRef, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInput } from '../../../../redux/slices/inputSlice';
import { filterHighPrice, filterLowPrice, filterMostRated } from 'redux/slices/goodsSlice';

// TYPES
import { RootState } from 'redux/store';

const Input: FC = () => {
	const input = useSelector((state: RootState) => state.input.input);
	const dispatch = useDispatch();

	const [dropdownShow, setDropdownShow] = useState<boolean>(false);
	const [onInput, setOnInput] = useState<boolean>(false);
	const [dropDownValue, setDropDownValue] = useState<string>('All');

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

	const handleHighPrice = useCallback((e: React.MouseEvent<HTMLLIElement>): void => {
		setDropDownValue(e.currentTarget.getAttribute('value'));
		dispatch(filterHighPrice());
	}, []);

	const handleLowPrice = useCallback((e: React.MouseEvent<HTMLLIElement>): void => {
		setDropDownValue(e.currentTarget.getAttribute('value'));
		dispatch(filterLowPrice());
	}, []);

	const handleMostRated = useCallback((e: React.MouseEvent<HTMLLIElement>): void => {
		setDropDownValue(e.currentTarget.getAttribute('value'));
		dispatch(filterMostRated());
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
			>{dropDownValue}
				<ul 
					className='dropdown-list'
					style={{
						transform: dropdownShow && 'translateY(0)',
						filter: dropdownShow && 'blur(0)',
						opacity: dropdownShow && 1,
						visibility: dropdownShow ? 'visible' : 'hidden',
					}}
				>
					<li className='list-item' value='All' onClick={e => handleHighPrice(e)}>
						All
					</li>
					<li className='list-item' value='HiPr' onClick={e => handleHighPrice(e)}>
						Higher price
					</li>
					<li className='list-item' value='LoPr' onClick={e => handleLowPrice(e)}>
						Lower price
					</li>
					<li className='list-item' value='MR' onClick={e => handleMostRated(e)}>
						Most rated
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
