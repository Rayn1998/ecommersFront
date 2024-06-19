import { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

import Header from '../Header/Header';
import ILayoutProps from 'types/ChildrenProps';

// POPUPS
import CreateGoodPopup from './components/CreateGoodPopup/CreateGoodPopup';


const Layout: FC<ILayoutProps> = ({ props, children }) => {
	const isCreatePopupOpen = useSelector(
		(state: RootState) => state.createGoodPopup.isOpen
	);

	return (
		<>
			{isCreatePopupOpen && <CreateGoodPopup {...props} />}
			<Header />
			{children}
		</>
	);
};

export default Layout;
