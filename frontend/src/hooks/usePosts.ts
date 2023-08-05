import useSWR from 'swr';

import fetcher from '../libs/fetcher';

const usePosts = (userId?: string) => {
  const url = userId ? `/posts?userId=${userId}` : '/posts';
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);
  //TODO write the backend for /posts

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default usePosts;
