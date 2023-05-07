import { api } from "../../../../utils/Api"

import { useDispatch } from "react-redux";
import { setGoods, filterGoods } from "../../../../redux/slices/goodsSlice";

const Good = ({props}) => {
  const dispatch = useDispatch();
  const handleXClick = () => {
    api.deleteGood(props._id)
      .then(res => {
        dispatch(filterGoods(res));
      })
      .catch(err => console.log(err));
  } 
  return (
    <div className="good">
      <img className="good-img" src={props.image} alt={props.name} />
      <div className="good-text">
        <p className="good-name">Name: {props.name}</p>
        <p className="good-brand">Brand: {props.brand}</p>
      </div>
      <input type='button' value='X' onClick={handleXClick} />
    </div>
  )
}

export default Good;