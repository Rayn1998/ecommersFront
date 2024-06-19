import { ReactNode, FC, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setClose } from 'redux/slices/popups/createGoodPopup';
import { removeCache } from 'redux/slices/cacheSlice';

import { RootState } from 'redux/store';
import ILayoutProps from 'types/ChildrenProps';

const Popup: FC<ILayoutProps> = ({ props, children }) => {
   const dispatch = useDispatch();
   const isOpen = useSelector((state: RootState) => state.createGoodPopup.isOpen);

   const handleEscClose = useCallback((e): void => {
		e.key === 'Escape' && handleCloseClick();
	}, []);

   const handleCloseClick = useCallback((): void => {
		dispatch(setClose());
		dispatch(removeCache());
	}, []);

   useEffect(() => {
		document.addEventListener('keydown', handleEscClose);
		return () => document.removeEventListener('keydown', handleEscClose);
	}, [isOpen]);

   return (
      <div className='popup'>
			<div className='popup-container'>
				<button
					className='popup-close-btn'
					type='button'
					onClick={handleCloseClick}
				>
					X
				</button>
				<p className='popup-title'>{props.popupName}</p>
            {children}
         </div>
      </div>
   )
}

export default Popup;