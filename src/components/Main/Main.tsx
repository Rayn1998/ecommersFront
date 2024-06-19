import { useState, useEffect, useCallback, FC } from 'react';

import { useSelector } from 'react-redux';

import ItemsContainer from '../ItemsContainer/ItemsContainer';
import GoodItem from '../GoodItem/GoodItem';
import Layout from '../Layout/Layout';
import { RootState } from 'redux/store';

// TYPES
import IGood from 'types/Good';

const Main: FC = () => {
	const input = useSelector((state: RootState) => state.input.input);
	const goods = useSelector((state: RootState) => state.goods.goods);
	const [currentGoods, setCurrentGoods] = useState<IGood[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [goodsPerPage, setGoodsPerPage] = useState<number>(9);

	const lastIndex: number = currentPage * goodsPerPage;
	const firstIndex: number = lastIndex - goodsPerPage;


	// SEARCH
	useEffect((): void => {
		const inputL: string = input.toLowerCase();
		if (inputL !== '') {
			const newGoods: IGood[] = goods.filter((good) => good.name.toLowerCase().includes(inputL)
				|| good.brand.toLowerCase().includes(inputL));
			setCurrentGoods(newGoods.slice(firstIndex, lastIndex));
		} else {
			setCurrentGoods(goods.slice(firstIndex, lastIndex));
		}
	}, [input, goods, firstIndex, lastIndex]);

	// PAGINATION LOGIC
	const handleNext = (): void => {
		currentPage < Math.ceil(goods.length / goodsPerPage) && setCurrentPage(currentPage => currentPage + 1);
	}

	const handlePrev = (): void => {
		currentPage > 1 && setCurrentPage(currentPage => currentPage - 1);
	}

	const handleLastPage = (): void => {
		setCurrentPage(Math.ceil(goods.length / goodsPerPage));
	}

	const handleFirstPage = (): void => {
		setCurrentPage(1);
	}

	// CHANGE AMOUNT OF CARDS PER PAGE
	//////////////////////////////////////////////////////////////////////////////
	const break1: number = 640;
	const break2: number = 1024;
	const break3: number = 1350;
	const break4: number = 1800;

	const checkWidth = useCallback((): void => {
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

	const handleResize = (): void => {
		setTimeout(() => checkWidth(), 1000);
	}

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [goodsPerPage]);

	useEffect((): void => {
		checkWidth();
	}, []);
	//////////////////////////////////////////////////////////////////////////////

	// useEffect(() => {
	// 	console.log(currentPage);
	// }, [currentPage]);

	return (
		<div className='main'>
			<Layout>
				<ItemsContainer>
					{currentGoods?.map((item: IGood) => {
							return <GoodItem key={item._id} {...item} />;
						})}
				</ItemsContainer>
			</Layout>
			<ul className='pagination'>
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
