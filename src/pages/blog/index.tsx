import { Center, Container, Spinner, Stack } from '@chakra-ui/react';
import React from 'react';

import BlogList from '@/components/blog/BlogList';
import Header from '@/components/common/Header';
import { InferGetStaticPropsType } from 'next';
import { Article } from '@/entity/Article';
import { client } from '@/libs/client';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function Blog(props: Props) {
  const articles = props.articles;

  return (
    <div>
      <Container maxW={'5xl'}>
        <Header title={'Blog'} path={'blog'} />
        <Stack
          mt={{ base: 20, md: 20 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
        >
          {!articles ? (
            <Center>
              <Spinner />
            </Center>
          ) : (
            <BlogList articles={articles!} />
          )}
        </Stack>
      </Container>
    </div>
  );
}

export async function getStaticProps() {
  const articles: Article[] = await client
    .get({ endpoint: 'articles' })
    .then((res) => res.contents);

  return {
    props: {
      articles: articles,
    },
  };
}
