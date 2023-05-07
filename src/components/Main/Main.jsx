import GoodItem from '../GoodItem/GoodItem';
import Layout from '../Layout/Layout';

import { useSelector } from 'react-redux';

const Main = () => {
	const input = useSelector((state) => state.input.input);
	const goods = useSelector((state) => state.goods.goods);

	return (
		<div className='main'>
			<Layout />
			<div className='items'>
				{goods?.filter((good) => {
						return input.toLowerCase() === ''
							? good
							: good.name.toLowerCase().includes(input.toLowerCase()) ||
									good.brand.toLowerCase().includes(input.toLowerCase());
					})
					.map((item) => {
						return <GoodItem key={item._id} props={item} />;
					})}
			</div>
		</div>
	);
};

export default Main;
