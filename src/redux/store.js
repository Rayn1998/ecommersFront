import { configureStore } from '@reduxjs/toolkit'
import user from './slices/userSlice';
import input from './slices/inputSlice';

export const store = configureStore({
    reducer: {
        user,
        input,
    },
});
