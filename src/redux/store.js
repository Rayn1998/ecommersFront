import { configureStore } from '@reduxjs/toolkit'
import user from './slices/userSlice';
import input from './slices/inputSlice';
import createGoodPopup from './slices/popups/createGoodPopup';

export const store = configureStore({
    reducer: {
        user,
        input,
        createGoodPopup
    },
});
