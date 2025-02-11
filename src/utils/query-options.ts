import { apiEndpoints } from '@/config/api-endpoints';
import {
  ACCESS_TOKEN_KEY,
  apiClient,
  REFRESH_TOKEN_KEY,
} from '@/lib/axios-instance';
import { queryClient } from '@/main';
import { ApiLoginResponse, Login } from '@/schemas/auth';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

/* mutations */
/* login mutation */
const loginUser = async (payload: Login) => {
  const response = await apiClient.post(apiEndpoints.auth.login, payload);

  return ApiLoginResponse.parse(response.data);
};

export function useLoginMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem(ACCESS_TOKEN_KEY, data.access);
      localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh);
      void queryClient.invalidateQueries();
      void navigate({ to: '/dashboard' });
    },
  });
}
