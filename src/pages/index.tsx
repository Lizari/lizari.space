import { Container, Stack, Text } from '@chakra-ui/react';
import React from 'react';

import FadeIn from '@/components/Common/FadeIn';
import Header from '@/components/Common/Header';
import LinkIcons from '@/components/Home/LinkIcons';
import TopBanner from '@/components/Home/TopBanner';

export default function Home() {
  return (
    <div>
      <Container maxW={'5xl'}>
        <Header title={'Home'} />
        <FadeIn>
          <Stack
            textAlign={'center'}
            align={'center'}
            mt={10}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 20, md: 28 }}
          >
            <TopBanner />
            <Text
              color={'gray.500'}
              fontSize={{ base: 'md', sm: 'xl', xl: '2xl' }}
              maxW={'3xl'}
            >
              Student - I like games and anime. I&rsquo;m also a hobbyist when
              it comes to programming, and have experience with Java,
              Javascript, and Python.
            </Text>
            <LinkIcons />
          </Stack>
        </FadeIn>
      </Container>
    </div>
  );
}
