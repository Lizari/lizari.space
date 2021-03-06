import { Box, Container, HStack, Text, VStack } from '@chakra-ui/react';
import matter from 'gray-matter';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { MdOutlineLocalPostOffice } from 'react-icons/md';

import Markdown from '@/components/Blog/Markdown';
import Header from '@/components/Common/Header';
import DatetimeUtil from '@/utils/DatetimeUtil';
import Fetcher from '@/utils/Fetcher';

export default function Page() {
  const router = useRouter();
  const [slug, setSlug] = useState('');

  useEffect(() => {
    if (router && router.query) setSlug((router.query.slug as string) ?? '');
  }, [router]);

  const { article, isLoading, isError } = Fetcher.useArticle(slug);
  const path = `blog/${slug}`;

  if (isLoading || !article)
    return (
      <div>
        <Header title={'Now Loading'} path={path} />
      </div>
    );
  if (isError)
    return (
      <div>
        <Header title={'Error!'} path={path} />
      </div>
    );

  return (
    <div>
      <Container maxW={'5xl'}>
        <Header
          title={article.title}
          path={path}
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
            <Markdown content={base64Decoder(article.content)} />
          </Box>
        </VStack>
      </Container>
    </div>
  );
}

function base64Decoder(content: string) {
  return matter(content).content;
}
