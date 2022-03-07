import { Center, Stack } from '@chakra-ui/react';
import React from 'react';

import BlogListCard from '@/components/Blog/BlogListCard';
import { Post } from '@/entity/Post';
import DatetimeUtil from '@/utils/DatetimeUtil';

const BlogList: React.VFC<{
  posts: Array<Post>;
}> = (props) => {
  return (
    <Center>
      <Stack direction={{ base: 'column', md: 'row' }} spacing={'20px'}>
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
      </Stack>
    </Center>
  );
};

export default BlogList;
