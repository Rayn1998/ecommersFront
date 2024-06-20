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
    }
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;