import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from '../reducers';

const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
  });
  return store;
};

const wrapper = createWrapper(makeStore);

export default wrapper;
