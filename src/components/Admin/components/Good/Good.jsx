const Good = ({props}) => {
  return (
    <div className="good">
      <img className="good-img" src={props.image} alt={props.name} />
      <div className="good-text">
        <p className="good-name">Name: {props.name}</p>
        <p className="good-brand">Brand: {props.brand}</p>
      </div>
      <input type='button' value='X' />
    </div>
  )
}

export default Good;