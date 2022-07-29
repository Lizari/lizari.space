import useSWR, { SWRResponse } from 'swr';
import { Article } from '../entity/Article';
import Fetcher from '../utils/Fetcher';

export const useArticleSWR = (
  fallbackData: Article,
): SWRResponse<Article, any> => {
  return useSWR(`/article`, Fetcher.getArticleFromAPI, {
    fallbackData,
    refreshInterval: 10000,
  });
};
