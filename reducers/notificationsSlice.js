import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    notificationAdded(state, action) {
      state.push(action.payload);
    },
    notificationRemoved(state, action) {
      const { id } = action.payload;
      const targetIdx = state.findIndex(notification => notification.id === id);
      state.splice(targetIdx, 1);
    }
  }
});

export const { notificationAdded, notificationRemoved } = notificationsSlice.actions;

export default notificationsSlice.reducer;
