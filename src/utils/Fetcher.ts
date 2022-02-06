import useSWR from 'swr';

import { Post } from '@/entity/Post';
import { Config } from '@/libs/Config';

const fetcher = async (url: string): Promise<any> =>
  await fetch(Config.API_URL + url, {
    mode: 'cors',
    method: 'GET',
  }).then((res) => res.json());

const usePosts = (include: boolean) => {
  const { data, error } = include
    ? useSWR<Array<Post>, Error>(`/blogs?include=true`, fetcher)
    : useSWR<Array<Post>, Error>(`/blogs`, fetcher);

  return {
    posts: data,
    isLoading: !error && !data,
    isError: error,
  };
};

const usePost = (slug: string) => {
  const { data, error } = useSWR<Post, Error>(`/blog/${slug}`, fetcher);

  return {
    post: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default {
  usePost,
  usePosts,
};
