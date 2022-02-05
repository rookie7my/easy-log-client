import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from '@reduxjs/toolkit';

const combinedReducer = combineReducers({});

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default:
      return combinedReducer(state, action);
  }
}

export default rootReducer;
