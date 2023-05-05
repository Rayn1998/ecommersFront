import { useSelector } from "react-redux";

const Favourites = () => {
  const user = useSelector(state => state.user.data);
  return (
    <div className="favourites">
    </div>
  )
}

export default Favourites;