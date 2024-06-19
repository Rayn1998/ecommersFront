import { FC } from 'react';

import IUser from 'types/User';

const User: FC<IUser> = (props) => {
  return (
    <div className="user">
      <div className='user-wrapper'>
        <p className="user-name">Name: {props.name}</p>
        <div className="options-wrapper">
          <p>Role:</p>
          <select className="options">
            <option value='customer'>Customer</option>
            <option value='admin'>Admin</option>
          </select>
        </div>
      </div>
      <button className='user__delete-btn' type='button'></button>
    </div>
  );
};

export default User;