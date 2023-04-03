import { Center, Container, Stack } from '@chakra-ui/react';
import React from 'react';

import FadeIn from '@/components/common/FadeIn';
import SlideIn from '@/components/common/SlideIn';
import Header from '@/components/common/Header';
import LinkIcons from '@/components/home/LinkIcons';
import ProfileCard from '@/components/home/ProfileCard';
import TopBanner from '@/components/home/TopBanner';
import HobbyCard from '@/components/home/HobbyCard';

export default function Home() {
  return (
    <div>
      <Container w={{ base: 'md', xl: '5xl' }}>
        <Header title={'Home'} path={'#'} />
        <SlideIn>
          <TopBanner />
        </SlideIn>
        <Center>
          <Stack spacing={12}>
            <FadeIn>
              <ProfileCard />
            </FadeIn>
            <FadeIn>
              <HobbyCard />
            </FadeIn>
            <FadeIn>
              <LinkIcons />
            </FadeIn>
          </Stack>
        </Center>
      </Container>
    </div>
  );
}
