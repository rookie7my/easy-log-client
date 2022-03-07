import { configureStore } from '@reduxjs/toolkit';

import notificationReducer from '../reducers/notificationsSlice';

const store = configureStore({
  reducer: {
    notifications: notificationReducer
  }
});

export default store;
