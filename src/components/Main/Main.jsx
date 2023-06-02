import { useState, useEffect, useCallback } from 'react';

import { useSelector } from 'react-redux';

import Pagination from 'react-bootstrap/Pagination';

import ItemsContainer from '../ItemsContainer/ItemsContainer';
import GoodItem from '../GoodItem/GoodItem';
import Layout from '../Layout/Layout';

const Main = () => {
	const input = useSelector((state) => state.input.input);
	const goods = useSelector((state) => state.goods.goods);
	const [currentGoods, setCurrentGoods] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [goodsPerPage, setGoodsPerPage] = useState(9);

	const lastIndex = currentPage * goodsPerPage;
	const firstIndex = lastIndex - goodsPerPage;


	// SEARCH
	useEffect(() => {
		if (input.toLowerCase() !== '') {
			const newGoods = goods.filter((good) => good.name.toLowerCase().includes(input.toLowerCase()));
			setCurrentGoods(newGoods.slice(firstIndex, lastIndex));
		} else {
			setCurrentGoods(goods.slice(firstIndex, lastIndex));
		}
	}, [input, goods, firstIndex, lastIndex]);

	// PAGINATION LOGIC
	const handleNext = () => {
		currentPage < Math.ceil(goods.length / goodsPerPage) && setCurrentPage(currentPage => currentPage + 1);
	}

	const handlePrev = () => {
		currentPage > 1 && setCurrentPage(currentPage => currentPage - 1);
	}

	const handleLastPage = () => {
		setCurrentPage(Math.ceil(goods.length / goodsPerPage));
	}

	const handleFirstPage = () => {
		setCurrentPage(1);
	}

	// CHANGE AMOUNT OF CARDS PER PAGE
	//////////////////////////////////////////////////////////////////////////////
	const break1 = 640;
	const break2 = 1024;
	const break3 = 1350;
	const break4 = 1680;

	const checkWidth = useCallback(() => {
		if (window.innerWidth <= break1) {
			setGoodsPerPage(2);
		} else if (window.innerWidth >= break1 && window.innerWidth <= break2) {
			setGoodsPerPage(4);
		}	else if (window.innerWidth >= break2 && window.innerWidth <= break3) {
			setGoodsPerPage(6);
		}	else if (window.innerWidth >= break3 && window.innerWidth <= break4) {
			setGoodsPerPage(8);
		} else {
			setGoodsPerPage(10);
		}
		setCurrentPage(1);
	}, []);

	const handleResize = () => {
		setTimeout(() => checkWidth(), 1000);
	}

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [goodsPerPage]);

	useEffect(() => {
		checkWidth();
	}, []);
	//////////////////////////////////////////////////////////////////////////////

	// useEffect(() => {
	// 	console.log(currentPage);
	// }, [currentPage]);

	return (
		<div className='main'>
			<Layout>
			<ItemsContainer props={{ currentPage, setCurrentPage }} >
				{currentGoods?.map((item) => {
						return <GoodItem key={item._id} props={item} />;
					})}
			</ItemsContainer>
			</Layout>
			<ul size='lg' className='pagination'>
				<li className='pagination-item' onClick={handleFirstPage} >First</li>
				<li className='pagination-item' onClick={handlePrev} >{'<'}</li>
				<li className='pagination-item'>{currentPage}</li>
				<li className='pagination-item' onClick={handleNext} >{'>'}</li>
				<li className='pagination-item' onClick={handleLastPage} >Last</li>
			</ul>
		</div>
	);
};

export default Main;
