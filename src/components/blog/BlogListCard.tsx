import {
  Box,
  Center,
  Flex,
  Image,
  Link,
  Spacer,
  Tag,
  TagLabel,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';

import DatetimeUtil from '@/utils/DatetimeUtil';
import { Article } from '@/entity/Article';
import fallback from '../../../public/fallback.jpg';

const BlogListCard: React.FC<Article> = (props) => {
  const [thumbnail, setThumbnail] = useState(props.eyecatch.url ?? null);

  return (
    <Box
      w={{ base: '300px', md: '350px', lg: '400px' }}
      boxShadow={'lg'}
      borderWidth={'1px'}
      borderRadius={'lg'}
      overflow={'hidden'}
      bgColor={'white'}
      textAlign={'center'}
    >
      <Center>
        <Image
          src={thumbnail}
          objectFit={'cover'}
          maxH={'220px'}
          alt={'thumbnail'}
          onError={() => setThumbnail(fallback.src)}
        />
      </Center>
      <Box p={'10px'}>
        <Flex mb={'10px'}>
          {props.tags.map((value) => (
            <Tag
              key={value}
              color={'teal.400'}
              bgColor={'green.100'}
              mr={'3px'}
            >
              <TagLabel>{value}</TagLabel>
            </Tag>
          ))}
          <Spacer />
          <Text color={'gray.400'} fontSize={{ base: 'sm', sm: 'md' }}>
            {`Latest update: ${DatetimeUtil.translate(props.updatedAt)}`}
          </Text>
        </Flex>
        <Box>
          <Link
            href={`/blog/${props.id}`}
            color={'gray.900'}
            fontSize={{ base: 'md', sm: 'xl', xl: '2xl' }}
            fontWeight={'bold'}
          >
            {props.title}
          </Link>
          <Box mt={'2px'}>
            <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
              {props.description}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BlogListCard;
