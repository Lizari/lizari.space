import { HStack, IconButton } from '@chakra-ui/react'
import React from 'react'
import { FaGithub, FaTwitch, FaTwitter } from 'react-icons/fa'

const LinkIcons = () => {
  return (
    <HStack justifyContent={'center'} pt={'10vh'} spacing={10} maxW={'3xl'}>
      <IconButton
        icon={<FaGithub size={'64px'} />}
        aria-label={'to Github'}
        as={'a'}
        size={'64px'}
        bg={'none'}
        _focus={{ _focus: 'none' }}
        href={'https://github.com/Lizari'}
      />
      <IconButton
        icon={<FaTwitter size={'64px'} />}
        aria-label={'to Twitter'}
        as={'a'}
        size={'64px'}
        bg={'none'}
        _focus={{ _focus: 'none' }}
        href={'https://twitter.com/XPS_mun'}
      />
      <IconButton
        icon={<FaTwitch size={'64px'} />}
        aria-label={'to Twitter'}
        as={'a'}
        size={'64px'}
        bg={'none'}
        _focus={{ _focus: 'none' }}
        href={'https://twitch.tv/xps_mun'}
      />
    </HStack>
  )
}

export default LinkIcons
