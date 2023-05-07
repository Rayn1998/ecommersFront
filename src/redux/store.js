import { configureStore } from '@reduxjs/toolkit'
import user from './slices/userSlice';
import input from './slices/inputSlice';
import createGoodPopup from './slices/popups/createGoodPopup';
import goodsSlice from './slices/goodsSlice';
import usersSlice from './slices/usersSlice';

export const store = configureStore({
    reducer: {
        user,
        input,
        createGoodPopup,
        goods: goodsSlice,
        users: usersSlice,
    },
});
