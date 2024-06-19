import { createSlice } from "@reduxjs/toolkit"

interface IState {
   isOpen: boolean;
}

const initialState: IState = {
   isOpen: false,
}

const deleteUserPopupSlice = createSlice({
   name: 'deleteUserPopup',
   initialState,
   reducers: {
      setOpen(state)
   }
})

export const { } = deleteUserPopupSlice.actions;
export default deleteUserPopupSlice.reducer;