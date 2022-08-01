import { Box, Container, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { MdOutlineLocalPostOffice } from 'react-icons/md';

import Markdown from '@/components/Blog/Markdown';
import Header from '@/components/Common/Header';
import DatetimeUtil from '@/utils/DatetimeUtil';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useArticleSWR } from '@/hooks/useArticleSWR';
import { Config } from '@/libs/Config';
import { Article } from '@/entity/Article';

type PathParams = {
  slug: string;
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function Blog({ fallbackData }: Props) {
  const { data } = useArticleSWR(fallbackData);
  if (!data) {
    return (
      <>
        <Header title={'Now Loading'} path={`/blog/${data!.title}`} />
      </>
    );
  }

  const article: Article = {
    ...data,
    content: Buffer.from(data.content, 'base64').toString(),
  };

  return (
    <div>
      <Container maxW={'5xl'}>
        <Header
          title={article.title}
          path={`blog/${data.title}`}
          description={article.description}
          image={article.thumbnail}
        />
        <VStack margin={'auto'} maxW={'3xl'} mt={{ base: '40px', md: '80px' }}>
          <Box pt={'20px'}>
            <Text
              fontWeight={'bold'}
              fontSize={{ base: '20px', sm: '40px', md: '50px' }}
            >
              {article.title}
            </Text>
          </Box>
          <HStack>
            <MdOutlineLocalPostOffice size={'42px'} />
            <Text fontSize={{ base: '20px', md: '30px' }}>
              {DatetimeUtil.translate(article.publishedAt)}
            </Text>
          </HStack>
          <Box
            w={{ base: '95%', md: '100%' }}
            py={'5vh'}
            whiteSpace={'break-spaces'}
          >
            <Markdown content={article.content} />
          </Box>
        </VStack>
      </Container>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const endpoint = Config.API_URL + '/article';
  const data = await fetch(endpoint);
  const articles = await data.json() as Article[];
  const paths = articles.map((article) => {
    return { params: { slug: article.title } };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as PathParams;
  const endpoint = Config.API_URL + `/article/${slug}`;
  const article = (await fetch(endpoint).then((x) => x.json())) as Article;

  return {
    props: {
      fallbackData: article,
    },
  };
};
