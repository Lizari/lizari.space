import useSWR from 'swr';

import { Article } from '@/entity/Article';
import { Config } from '@/libs/Config';

const fetcher = async (url: string): Promise<any> =>
  await fetch(Config.API_URL + url, {
    mode: 'cors',
    method: 'GET',
  }).then((res) => res.json());

const useArticles = () => {
  const { data, error } = useSWR<Article[], Error>(`/article`, fetcher);

  return {
    articles: data,
    isLoading: !error && !data,
    isError: error,
  };
};

const useArticle = (title: string) => {
  const { data, error } = useSWR<Article, Error>(`/article/${title}`, fetcher);

  return {
    article: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default {
  useArticle,
  useArticles,
};
