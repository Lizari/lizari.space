export type Article = {
  id: string;
  description: string;
  content: string;
  title: string;
  tags: string[];
  eyecatch: {
    url: string;
    height: number;
    width: number;
  };
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  revisedAt: Date;
};
