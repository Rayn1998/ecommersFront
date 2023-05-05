import { useSelector } from 'react-redux';
// import profileImage from '../../assets/images/profile_imagejpg.jpg';
import Layout from '../Layout/Layout';

const Profile = () => {
	const user = useSelector((state) => state.user.data);
	return (
		<>
			<Layout />
			<div className='profile-area'>
				<p>Welcome back, </p>
        <span>{user.name}</span>
			</div>
		</>
	);
};

export default Profile;
