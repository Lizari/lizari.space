import { Box, Center, Text } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

import FadeIn from '@/components/Common/FadeIn'

type Props = {
  column: string
  children: ReactNode
}

const AboutCard: React.VFC<Props> = (props) => {
  return (
    <FadeIn>
      <Center>
        <Box
          w={'80%'}
          mt={'5vh'}
          p={'3px'}
          boxShadow={'2xl'}
          borderRadius={'xl'}
          textAlign={'center'}
          textColor={'black'}
          bg={'white'}
        >
          <Text
            fontWeight={'semibold'}
            fontSize={{ base: '20px', md: '30px' }}
            mb={'8px'}
          >
            {props.column}
          </Text>
          <Box fontWeight={'hairline'} fontSize={{ base: '16px', md: '22px' }}>
            {props.children}
          </Box>
        </Box>
      </Center>
    </FadeIn>
  )
}

export default AboutCard
