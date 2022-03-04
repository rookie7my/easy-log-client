import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: (state = {}, action) => state,
  devTools: true,
});

export default store;
