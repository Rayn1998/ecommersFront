import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CartItem from "../CartItem/CartItem";

const Cart = ({isOpen}) => {
  const cart = useSelector(state => state.cart.data);
  const navigate = useNavigate();

  const handlePay = () => {
    navigate('/payment');
  }

  return (
    <div 
      className="cart"
      style={{
        opacity: isOpen && 1,
        filter: isOpen && 'blur(0)',
        transform: isOpen ? 'translateY(0)' : 'translateY(-200%)',
      }}
    >
      <div className="items-container">
        {cart.map(item => <CartItem key={item._id} props={item} />)}
      </div>
      <button
        className="cart__pay"
        onClick={handlePay}
      >Pay!</button>
    </div>
  );
};

export default Cart;