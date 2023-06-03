const User = ({props}) => {
  return (
    <div className="user">
      <p className="user-name">{props.name}</p>
      <div className="options-wrapper">
        <p>Role:</p>
        <select className="options">
          <option name='customer'>Customer</option>
          <option name='admin'>Admin</option>
        </select>
      </div>
      <button className='user__delete-btn' type='button'></button>
    </div>
  );
};

export default User;