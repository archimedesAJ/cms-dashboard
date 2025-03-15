import { apiEndpoints } from '@/config/api-endpoints';
import { config } from '@/config/app';
import {
  ACCESS_TOKEN_KEY,
  apiClient,
  REFRESH_TOKEN_KEY,
} from '@/lib/axios-instance';
import { queryClient } from '@/main';
import {
  ApiLoginPayload,
  ApiLoginResponse,
  ApiLogoutPayload,
} from '@/schemas/auth';
import {
  ApiCreateMemberResponse,
  ApiGetMembersResponse,
} from '@/schemas/members';
import { queryOptions, useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import axios from 'axios';
import { toast } from 'sonner';

/* queries */
const membersQueryKey = ['members'];
const getMembers = async () => {
  const response = await apiClient.get(apiEndpoints.members.base);
  return ApiGetMembersResponse.parse(response.data);
};
export const membersQueryOptions = () => {
  return queryOptions({
    queryKey: membersQueryKey,
    queryFn: getMembers,
  });
};

/* mutations */
const login = async (payload: ApiLoginPayload) => {
  const response = await axios.post(
    `${config.apiBaseUrl}${apiEndpoints.auth.login}`,
    payload,
  );

  return ApiLoginResponse.parse(response.data);
};
export function useLoginMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem(ACCESS_TOKEN_KEY, data.access);
      localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh);
      void queryClient.invalidateQueries();
      void navigate({ to: '/dashboard' });
    },
    onError: () => {
      toast.error('Login failed');
    },
  });
}

const logout = async (payload: ApiLogoutPayload) => {
  const response = await apiClient.post(apiEndpoints.auth.logout, payload);
  return response;
};
export function useLogoutMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      void queryClient.invalidateQueries();
      void navigate({ to: '/' });
    },
  });
}

const createMember = async (payload: FormData) => {
  const response = await apiClient.post(apiEndpoints.members.base, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return ApiCreateMemberResponse.parse(response.data);
};
export function useCreateMemberMutation() {
  return useMutation({
    mutationFn: createMember,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: membersQueryKey,
      });
    },
  });
}
