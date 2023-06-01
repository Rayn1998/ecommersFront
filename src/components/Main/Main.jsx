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
		currentPage < Math.round(goods.length / goodsPerPage) && setCurrentPage(currentPage => currentPage + 1);
	}

	const handlePrev = () => {
		currentPage > 1 && setCurrentPage(currentPage => currentPage - 1);
	}

	const handleLastPage = () => {
		setCurrentPage(Math.round(goods.length / goodsPerPage));
	}

	const handleFirstPage = () => {
		setCurrentPage(1);
	}

	// CHANGE AMOUNT OF CARDS PER PAGE
	//////////////////////////////////////////////////////////////////////////////
	const checkWidth = useCallback(() => {
		if (window.innerWidth <= 640) {
			setGoodsPerPage(2);
		} else if (window.innerWidth >= 640 && window.innerWidth <= 1024) {
			setGoodsPerPage(4);
		}	else if (window.innerWidth >= 1024 && window.innerWidth <= 1280) {
			setGoodsPerPage(6);
		}	else if (window.innerWidth >= 1280 && window.innerWidth <= 1680) {
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
			<Layout />
			<ItemsContainer props={{ currentPage, setCurrentPage }} >
				{currentGoods?.map((item) => {
						return <GoodItem key={item._id} props={item} />;
					})}
			</ItemsContainer>
			<Pagination size='lg' className='pagination'>
				<Pagination.Item onClick={handleFirstPage} >First</Pagination.Item>
				<Pagination.Item onClick={handlePrev} >{'<'}</Pagination.Item>
				<Pagination.Item>{currentPage}</Pagination.Item>
				<Pagination.Item onClick={handleNext} >{'>'}</Pagination.Item>
				<Pagination.Item onClick={handleLastPage} >Last</Pagination.Item>
			</Pagination>
		</div>
	);
};

export default Main;
