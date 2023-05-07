import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { addFavourite } from "../../redux/slices/userSlice";

const GoodItem = ({props}) => {
  const { name, brand, categorie, image, rating, price, _id: id } = props;
  const dispatch = useDispatch();

  const handleFav = useCallback((e) => {
    dispatch(addFavourite(props));
  }, []);
  return (
    <div className="good-item">
      <div className='good-item__image-wrapper'>
        <img className='good-item__image' src={image} alt='Picture' />
        <div 
          className='image-fav'
          onClick={handleFav}
        ></div>
        <div className='image-cart'></div>
        <div></div>
      </div>
      <div className='good-item__base'>
        <p className='good-item__name'>{name}</p>
        <p className='good-item__brand'>{brand}</p>
        <div className='good-item__rating'>
          <div className='stars'>{rating}*</div>
          <p>Reviews</p>
        </div>
        <p className='good-item__price'>{price}$</p>
      </div>
    </div>
  );
}

export default GoodItem;
