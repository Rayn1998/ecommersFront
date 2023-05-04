import amazonLogo from '../../assets/images/amazon_logo.png';

const Header = () => {
	return (
		<div className='header'>
			<img 
        className='header__logo' 
        src={amazonLogo} 
        alt='Amazon Logo' 
      />
      <input className='header__search' />
		</div>
	);
};

export default Header;
