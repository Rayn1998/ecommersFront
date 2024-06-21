import { FC, useCallback, useEffect, useState } from 'react';
import { updateUsers } from 'redux/slices/usersSlice';

import { api } from 'utils/Api';

import IUser from 'types/User';

const User: FC<IUser> = (props) => {
  const [role, setRole] = useState<string>('')
  const handleSelect = useCallback((e) => {
    const data = {
      name: props.name, 
      email: props.email,
      role: e.target.value,
    }
    api.updateUser(data, props._id)
      .then((res) => {
        if(res) {
          setRole(res.data.role)
          updateUsers(res.data)
        } else {
          throw new Error("'didn't work :((")
        }
      }).catch(err => console.log(err))
  }, []);

  useEffect(() => {
    setRole(props.role)
  }, [])
  return (
    <div className="user">
      <div className='user-wrapper'>
        <p className="user-name">Name: {props.name}</p>
        <div className="options-wrapper">
          <p>Role:</p>
          <select className='options' value={role} onChange={handleSelect}>
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