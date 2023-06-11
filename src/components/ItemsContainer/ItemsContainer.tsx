import { FC, ReactNode } from 'react';

interface IProps {
	children?: ReactNode;
}

const ItemsContainer: FC<IProps> = ({ children }) => {
	return (
    <div className='items'>{children}</div>
	);
};

export default ItemsContainer;
