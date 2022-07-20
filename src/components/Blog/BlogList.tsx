import { Center, Stack } from '@chakra-ui/react';
import React from 'react';

import BlogListCard from '@/components/Blog/BlogListCard';
import DatetimeUtil from '@/utils/DatetimeUtil';
import { Article } from '@/entity/Article';

const BlogList: React.FC<{
  articles: Article[];
}> = (props) => {
  return (
    <Center>
      <Stack direction={{ base: 'column', md: 'row' }} spacing={'20px'}>
        {props.articles
          .sort((a: Article, b: Article) => {
            return DatetimeUtil.compare(a.publishedAt, b.publishedAt);
          })
          .map((article: Article) => {
            return <BlogListCard key={article.id} {...article} />;
          })}
      </Stack>
    </Center>
  );
};

export default BlogList;
