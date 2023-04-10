import { Box, Container, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { MdOutlineLocalPostOffice } from 'react-icons/md';

import Markdown from '@/components/blog/Markdown';
import Header from '@/components/common/Header';
import DatetimeUtil from '@/utils/DatetimeUtil';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { Article } from '@/entity/Article';
import { Client } from '@/libs/Client';
import { NodeHtmlMarkdown } from 'node-html-markdown';

type PathParams = {
  id: string;
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function Blog(props: Props) {
  const article: Article = props.article;

  return (
    <div>
      <Container maxW={'5xl'}>
        <Header
          title={article.title}
          path={`blog/${article.id}`}
          description={article.description}
          image={article.eyecatch.url ?? ""}
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
              {DatetimeUtil.translate(article.updatedAt)}
            </Text>
          </HStack>
          <Box w={{ base: '95%', md: '100%' }} py={'5vh'}>
            <Markdown
              content={NodeHtmlMarkdown.translate(article.content, {
                strongDelimiter: '**',
              })}
            />
          </Box>
        </VStack>
      </Container>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const articles: Article[] = await Client.get({ endpoint: 'articles' }).then(
    (res) => res.contents,
  );
  const paths = articles.map((article) => {
    return { params: { id: article.id } };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as PathParams;
  const article: Article = await Client.get({
    endpoint: 'articles',
    contentId: id,
  });

  return {
    props: {
      article: article,
    },
  };
};
