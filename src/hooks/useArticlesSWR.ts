import useSWR, { SWRResponse } from 'swr';
import { Article } from '../entity/Article';
import Fetcher from '../utils/Fetcher';

export const useArticlesSWR = (
  fallbackData: Article[],
): SWRResponse<Article[], any> => {
  return useSWR(`/article`, Fetcher.getArticlesFromAPI, {
    fallbackData,
    refreshInterval: 10000,
  });
};
