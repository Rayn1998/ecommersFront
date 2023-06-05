import { useSelector } from 'react-redux';

import Layout from '../Layout/Layout';

const GoodPage = () => {
	const currentGood = useSelector(state => state.currentGood.data);
	console.log(currentGood);
	return (
		<Layout>
			<section className='good-page'>
        <div className='good-page-wrapper'>
					{/* <img src={currentGood.image} alt='cover' /> */}
				</div>

      </section>
		</Layout>
	);
};

export default GoodPage;
