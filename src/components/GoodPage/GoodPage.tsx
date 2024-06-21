import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Layout from '../Layout/Layout';

// TYPES
// import { RootState } from 'redux/store';
import IGood from 'types/Good';

const GoodPage: FC = () => {
	const [image, setImage] = useState<string>('')
	const [currentGood, setCurrentGood] = useState<IGood>()
	useEffect(() => {
		const localItem = JSON.parse(localStorage.getItem('currentGood'))
		setCurrentGood(localItem)
		setImage(localItem.image)
	}, [image]);
	return (
		<Layout>
			<section className='good-page'>
        		<div className='good-page-wrapper' style={{
					backgroundImage: image && `url(${image})`
				}}>
					<p className='good-page__name'>{currentGood?.name}</p>
				</div>

      </section>
		</Layout>
	);
};

export default GoodPage;
