import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { notificationAdded } from '../reducers/notificationsSlice';

const useNotifications = () => {
  const dispatch = useDispatch();
  
  const addNotification = useCallback(({ type, message, isAutoClose }) => {
    dispatch(notificationAdded({ id: nanoid(), type, message, isAutoClose }));
  }, [dispatch]);

  return ({ addNotification });
};

export default useNotifications;
