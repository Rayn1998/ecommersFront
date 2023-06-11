import { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

import Header from '../Header/Header';

// POPUPS
import CreateGoodPopup from './components/CreateGoodPopup/CreateGoodPopup';

interface ILayoutProps {
	props?: any;
	children?: ReactNode;
}

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
