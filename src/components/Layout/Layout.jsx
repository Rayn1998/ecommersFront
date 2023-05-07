import { useSelector } from 'react-redux';

import Header from '../Header/Header';
import SideMenu from '../SideMenu/SideMenu';

// POPUPS
import CreateGoodPopup from './components/CreateGoodPopup/CreateGoodPopup';

const Layout = (props) => {
	const isCreatePopupOpen = useSelector(
		(state) => state.createGoodPopup.isOpen
	);

	return (
		<>
			{isCreatePopupOpen && <CreateGoodPopup props={props} />}
			<Header />
			<SideMenu />
		</>
	);
};

export default Layout;
