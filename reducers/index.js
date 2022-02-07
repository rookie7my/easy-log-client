import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from '@reduxjs/toolkit';
import currentUserReducer from './currentUserSlice';

const combinedReducer = combineReducers({
  currentUser: currentUserReducer,
});

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default:
      return combinedReducer(state, action);
  }
}

export default rootReducer;
