import { Box, SimpleGrid } from '@chakra-ui/react';
import React from 'react';

import BlogListCard from '@/components/Blog/BlogListCard';
import { Post } from '@/entity/Post';
import DatetimeUtil from '@/utils/DatetimeUtil';

const BlogList: React.VFC<{
  posts: Array<Post>;
}> = (props) => {
  return (
    <Box>
      <SimpleGrid minChildWidth={'300px'} spacingY={'20px'}>
        {props.posts
          .sort((a: Post, b: Post) => {
            return DatetimeUtil.compare(
              DatetimeUtil.parse(a.meta.posted_by),
              DatetimeUtil.parse(b.meta.posted_by),
            );
          })
          .map((post: Post) => {
            return <BlogListCard key={post.meta.slug} {...post} />;
          })}
      </SimpleGrid>
    </Box>
  );
};

export default BlogList;
