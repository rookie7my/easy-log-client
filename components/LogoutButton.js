import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { BsBoxArrowRight } from 'react-icons/bs';
import axios from 'axios';

import useNotifications from '../hooks/useNotifications';
import { NOTIFICATION_TYPE } from './Notifications/Notification';

async function logout() {
    const response = await axios.post('/api/logout');
    return response.data;
}

const LogoutButton = () => {
  const { addNotification } = useNotifications();

  const router = useRouter();

  const queryClient = useQueryClient();

  const logoutMutation = useMutation(logout, {
    onSuccess: (data) => {
      if(!data.isLoggedIn) {
        queryClient.invalidateQueries('currentUser');
        router.push('/');
        addNotification({
          type: NOTIFICATION_TYPE.SUCCESS,
          message: '로그아웃 되었습니다.',
          isAutoClose: true
        });
      }
    }
  });

  const onLogoutButtonClicked = useCallback( () => {
      logoutMutation.mutate();
  }, [logoutMutation]);

  return (
    <button
      disabled={logoutMutation.isLoading}
      className="hover:text-blue-500 w-full flex justify-end items-center gap-x-2"
      onClick={onLogoutButtonClicked}>
      <span>로그아웃</span>
      <BsBoxArrowRight />
    </button>
  );
};

export default LogoutButton;
