import { Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const TopBanner: React.FC = () => {
  return (
    <HStack
      spacing={10}
      alignItems={'center'}
      py={{ base: 15, md: 20 }}
      sx={{ paddingLeft: 10 }}
    >
      <Image
        boxSize={{ base: '150px', xl: '300px' }}
        rounded={'80%'}
        objectFit={'cover'}
        boxShadow={'2xl'}
        alt={'profile icon'}
        src={'https://avatars.githubusercontent.com/u/39207967?v=4'}
      />
      <VStack>
        <Heading
          lineHeight={'110%'}
          fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
        >
          Lizari
        </Heading>
        <Text
          fontSize={{ base: 'md', sm: 'xl', md: '2xl' }}
          fontWeight={'bold'}
        >
          Hoshi Kaito
        </Text>
      </VStack>
    </HStack>
  );
};

export default TopBanner;
