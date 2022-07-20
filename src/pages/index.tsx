import { Container, Stack } from '@chakra-ui/react';
import React from 'react';

import FadeIn from '@/components/Common/FadeIn';
import Header from '@/components/Common/Header';
import LinkIcons from '@/components/Home/LinkIcons';
import ProfileCard from '@/components/Home/ProfileCard';
import SkillSetCard from '@/components/Home/SkillSetCard';
import TopBanner from '@/components/Home/TopBanner';

export default function Home() {
  return (
    <div>
      <Container maxW={'5xl'}>
        <Header title={'Home'} path={'#'} />
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={12}
          py={{ base: 20, md: 28 }}
        >
          <FadeIn>
            <TopBanner />
          </FadeIn>
          <FadeIn>
            <ProfileCard />
          </FadeIn>
          <FadeIn>
            <SkillSetCard />
          </FadeIn>
          <LinkIcons />
        </Stack>
      </Container>
    </div>
  );
}
