import { useSelector } from "react-redux";

import Layout from "../Layout/Layout";
import GoodItem from '../GoodItem/GoodItem';

const Favourites = () => {
  const userFavourites = useSelector(state => state.user.data.favourites);
  return (
    <>
      <Layout />
      {/* TODO: сделать компонент из контейнера снизу */}
      <div className="favourites">
        {userFavourites.length === 0 
          ? <p>There is no favourites yet...</p>
          : userFavourites.map(fav => <GoodItem key={fav._id} props={fav} />)
        }
      </div>
    </>
  )
}

export default Favourites;