import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CartItem from "../CartItem/CartItem";

const Cart = ({isOpen}) => {
  const cart = useSelector(state => state.cart.data);
  useEffect(() => console.log(cart), [cart]);

  const navigate = useNavigate();

  const handlePay = () => {
    navigate('/payment');
  }

  return (
    <div 
      className="cart"
      style={{
        transition: 'all 0.3s ease-in-out',
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'translateY(0)' : 'translateY(-200%)',
      }}
    >
      <div className="items-container">
        {cart.map(item => <CartItem key={item._id} props={item} />)}
      </div>
      <button
        onClick={handlePay}
      >Pay!</button>
    </div>
  );
};

export default Cart;