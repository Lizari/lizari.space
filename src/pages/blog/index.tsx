import { Center, Container, Spinner, Stack } from '@chakra-ui/react';
import React from 'react';

import BlogList from '@/components/Blog/BlogList';
import Header from '@/components/Common/Header';
import { InferGetStaticPropsType } from 'next';
import { Config } from '@/libs/Config';
import { Article } from '@/entity/Article';
import { useArticlesSWR } from '@/hooks/useArticlesSWR';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function Blog({ fallbackData }: Props) {
  const { data } = useArticlesSWR(fallbackData);
  const articles = data;

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
  const endpoint = Config.API_URL + '/article';
  const articles = (await fetch(endpoint).then((x) => x.json())) as Article[];

  return {
    props: {
      fallbackData: articles,
    },
  };
}
