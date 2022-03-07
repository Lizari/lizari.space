import {
  Box,
  Center,
  Flex,
  Image,
  Link,
  Tag,
  TagLabel,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

import { Post } from '@/entity/Post';
import DatetimeUtil from '@/utils/DatetimeUtil';

const BlogListCard: React.VFC<Post> = (props) => {
  const router = useRouter();
  const handleLinkClick = (url: string) => router.push(url);

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
          src={props.thumbnail}
          objectFit={'cover'}
          maxH={'220px'}
          style={{ filter: 'blur(4px)' }}
          alt={'thumbnail'}
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
        </Flex>
        <Box>
          <Link
            color={'gray.900'}
            fontSize={{ base: 'md', sm: 'xl', xl: '2xl' }}
            fontWeight={'semibold'}
            onClick={() => handleLinkClick(`/blog/${props.meta.slug}`)}
          >
            {props.title}
          </Link>
          <Text
            color={'gray.400'}
            mt={'5px'}
            align={'center'}
            fontSize={{ base: 'sm', sm: 'md' }}
          >
            最終更新日:{' '}
            {DatetimeUtil.translate(DatetimeUtil.parse(props.meta.posted_by))}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default BlogListCard;
