import { Article } from '../entity/Article';

const getArticleFromAPI = async (args: string): Promise<Article> => {
  const response = await fetch(args);

  return (await response.json()) as Article;
};

const getArticlesFromAPI = async (args: string): Promise<Article[]> => {
  const response = await fetch(args);

  return (await response.json()) as Article[];
};

export default {
  getArticleFromAPI,
  getArticlesFromAPI,
};
