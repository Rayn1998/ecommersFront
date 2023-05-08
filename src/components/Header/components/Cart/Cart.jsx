import { useEffect } from "react";
import { useSelector } from "react-redux";

const Cart = ({isOpen}) => {
  const cart = useSelector(state => state.cart.data);
  useEffect(() => console.log(cart), [cart]);

  return (
    <div 
      className="cart"
      style={{
        transition: 'all 0.3s ease-in-out',
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'translateY(0)' : 'translateY(-200%)',
      }}
    >
      {cart.map(item => <p key={item._id}>{item.name}</p>)}
    </div>
  );
};

export default Cart;