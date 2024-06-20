import { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeRole } from '../../../../redux/slices/userSlice';

import IUser from 'types/User';
import { RootState } from 'redux/store';

const User: FC<IUser> = (props) => {
  const user = useSelector((state: RootState) => state.user.data);
  const dispatch = useDispatch();
  const handleSelect = useCallback((e) => {
    dispatch(changeRole(e.target.value))
  }, []);
  return (
    <div className="user">
      <div className='user-wrapper'>
        <p className="user-name">Name: {props.name}</p>
        <div className="options-wrapper">
          <p>Role:</p>
          <select className='options' value={user.role} onChange={handleSelect}>
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