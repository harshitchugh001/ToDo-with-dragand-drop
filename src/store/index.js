import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalSlice';
import todoReducer from './todoSlice';

export default configureStore({
  reducer: {
    modal: modalReducer,
    todo: todoReducer,
  },
});