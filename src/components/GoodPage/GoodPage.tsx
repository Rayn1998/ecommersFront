import { FC } from 'react';
import { useSelector } from 'react-redux';

import Layout from '../Layout/Layout';

// TYPES
import { RootState } from 'redux/store';

const GoodPage: FC = () => {
	const currentGood = useSelector((state: RootState) => state.currentGood.data);
	// console.log(currentGood);
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
