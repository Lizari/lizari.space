import { Center, Heading, HStack, Image } from '@chakra-ui/react';
import React from 'react';

const TopBanner = () => {
  return (
    <HStack spacing={'10'}>
      <Image
        boxSize={{ base: '200px', md: '300px' }}
        rounded={'80%'}
        objectFit={'cover'}
        boxShadow={'2xl'}
        alt={'profile icon'}
        src={'https://avatars.githubusercontent.com/u/39207967?v=4'}
      />
      <Center>
        <Heading
          lineHeight={'110%'}
          fontSize={{ base: '4xl', sm: '6xl', md: '8xl' }}
        >
          Lizari
        </Heading>
      </Center>
    </HStack>
  );
};

export default TopBanner;
