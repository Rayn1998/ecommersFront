import IUser from '../../types/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISliceState {
  users: IUser[];
}

const initialState: ISliceState = {
  users: [],
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, { payload }: PayloadAction<IUser[]>) {
      state.users = [ ...payload ];
    },
    updateUsers(state, { payload }: PayloadAction<IUser>) {
      state.users.map((user) => {
        return user._id === payload._id ? payload : user
      })
    },
  },
});

export const { setUsers, updateUsers } = usersSlice.actions;
export default usersSlice.reducer;