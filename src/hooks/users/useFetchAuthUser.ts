import { fetchUser } from '@api/auth';
import { setUser } from '@store/index';
import { useQuery } from '@tanstack/react-query';
import { useAppDispatch } from '@utils/redux';

export const useFetchAuthUser = () => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    onSuccess(data) {
      dispatch(
        setUser({
          id: data.id,
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
          role: data.role,
        })
      );
    },
  });
};
