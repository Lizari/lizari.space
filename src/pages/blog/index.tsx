import { Center, Container, Spinner, Stack } from '@chakra-ui/react';
import React from 'react';

import BlogList from '@/components/Blog/BlogList';
import Header from '@/components/Common/Header';
import Fetcher from '@/utils/Fetcher';

export default function Blog() {
  const { articles, isLoading, isError } = Fetcher.useArticles();
  return (
    <div>
      <Container maxW={'5xl'}>
        <Header title={'Blog'} path={'blog'} />
        <Stack
          mt={{ base: 20, md: 20 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
        >
          {isLoading || isError || !articles ? (
            <Center>
              <Spinner />
            </Center>
          ) : (
            <BlogList articles={articles} />
          )}
        </Stack>
      </Container>
    </div>
  );
}
