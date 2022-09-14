import { Box, Stack, Text, Button } from '@chakra-ui/react';
import React from 'react';
import { FaGithub, FaTwitch, FaTwitter } from 'react-icons/fa';

const LinkIcons: React.FC = () => {
  return (
    <Box pb={5}>
      <Text as={'u'} fontSize={'2xl'} fontWeight={'semibold'}>
        On the web
      </Text>
      <Stack direction={'row'} pt={5} spacing={10} maxW={'3xl'}>
        <Button
          leftIcon={<FaGithub size={'42px'} />}
          aria-label={'to Github'}
          as={'a'}
          bg={'none'}
          _focus={{ _focus: 'none' }}
          href={'https://github.com/Lizari'}
        >
          Lizari
        </Button>
        <Button
          leftIcon={<FaTwitter size={'42px'} />}
          aria-label={'to Twitter'}
          as={'a'}
          bg={'none'}
          _focus={{ _focus: 'none' }}
          href={'https://twitter.com/XPS_mun'}
        >
          @XPS_mun
        </Button>
        <Button
          leftIcon={<FaTwitch size={'42px'} />}
          aria-label={'to Twitter'}
          as={'a'}
          bg={'none'}
          _focus={{ _focus: 'none' }}
          href={'https://twitch.tv/xps_mun'}
        >
          XPS_mun
        </Button>
      </Stack>
    </Box>
  );
};

export default LinkIcons;
