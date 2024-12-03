import { useQuery } from '@tanstack/react-query';

import { getAccount } from '@/api';
import { queryClient } from '@/App';

const useAccount = () => {

  const queryFn = async () => {
    const account = await getAccount(); // Use your defined `getAccount` function
    return account;
  };

  const invalidateAccountQuery = () => {
    queryClient.invalidateQueries(['account'] as any);
  };

  return {
    invalidateAccountQuery,
    ...useQuery({
      queryFn,
      queryKey: ['account'],
      refetchInterval: query => (query.state.data?.status === 'completed' ? false : 12 * 1000)
    }),
  };
};

export default useAccount;
