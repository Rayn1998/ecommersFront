import { useSelector } from 'react-redux';

import Layout from '../Layout/Layout';

const Payment = () => {
  const cart = useSelector(state => state.cart.data);
  console.log(cart);
  return (
    <>
      <Layout />
      <section className='payment'>
        <div className='payment__list'>
          {cart.map(item => <div className='payment__item' key={item._id}>
            <img className='payment__item-image' src={item.image} alt='game image' />
            <p className='payment__item-name'>{item.name}</p>
            <p className='payment__item-name'>{item.price}</p>
            <p className='payment__item-amount'></p>
            <button className='payment__item-del'>X</button>
          </div>)}
        </div>
        <div className='payment__info'>
          <p className='payment__info-title'>TOTAL:</p>
          <p className='payment__info-price'>500</p>
          <button className='payment__button'>Pay</button>
        </div>
      </section>
    </>
  );
};

export default Payment;