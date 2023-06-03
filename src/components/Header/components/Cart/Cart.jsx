import { forwardRef,useCallback } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CartItem from "../CartItem/CartItem";

const Cart = forwardRef((props, ref) => {
  const { isOpen } = props;
  const cart = useSelector(state => state.cart.data);
  const navigate = useNavigate();

  const handlePay = useCallback((e) => {
    navigate('/payment');
  }, []);

  return (
    <div 
      ref={ref}
      className="cart"
      style={{
        opacity: isOpen && 1,
        filter: isOpen && 'blur(0)',
        transform: isOpen ? 'translateY(0)' : 'translateY(-200%)',
      }}
    >
      <div className="items-container">
        {cart.length === 0
          ? <p className="items-container__nothing">Nothing in the cart...</p>
          : cart.map(item => <CartItem key={item._id} props={item} />)
        }
      </div>
      <button
        className="cart__pay"
        onClick={handlePay}
      >Pay!</button>
    </div>
  );
});

export default Cart;