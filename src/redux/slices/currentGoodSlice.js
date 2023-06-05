import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
}

const currentGoodSlice = createSlice({
  name: 'currentGood',
  initialState,
  reducers: {
    setCurrentGood(state, { payload }) {
      state.data = payload;
    }
  }
});

export const { setCurrentGood } = currentGoodSlice.actions;
export default currentGoodSlice.reducer;
