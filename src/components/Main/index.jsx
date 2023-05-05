import GoodItem from '../GoodItem';
import Layout from '../Layout/Layout';

import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { api } from '../../utils/Api';

const Main = () => {
	const input = useSelector((state) => state.input.input);
	const [goods, setGoods] = useState([]);

	useEffect(() => {
		api
			.getGoods()
			.then((res) => {
				setGoods(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className='main'>
			<Layout />
			<div className='items'>
				{goods
					.filter((good) => {
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
