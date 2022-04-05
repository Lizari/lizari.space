import { Box, List, ListIcon, ListItem, Text } from '@chakra-ui/react';
import { CgProfile } from 'react-icons/cg';
import { FaBirthdayCake, FaGamepad } from 'react-icons/fa';
import { GiSkills } from 'react-icons/gi';

const ProfileCard = () => {
  return (
    <Box borderWidth={'1px'} borderRadius={'3%'} w={'full'} p={'15px'}>
      <Text
        textAlign={'center'}
        fontSize={{ base: 'xl', md: '3xl', xl: '4xl' }}
      >
        Simple Profile
      </Text>
      <Text
        mt={'15px'}
        textAlign={'center'}
        fontSize={{ base: 'sm', sm: 'md', xl: 'md' }}
      >
        宮城県出身の情報系の学校に通ってる学生です。高校生3年生からプログラミングにハマってここまで来ました。下記に簡単なプロフィールを載せておきます。
      </Text>
      <List
        mt={'5px'}
        spacing={4}
        fontSize={{ base: 'md', sm: 'xl', xl: '2xl' }}
        textAlign={'start'}
      >
        <ListItem>
          <ListIcon as={CgProfile} color={'mediumaquamarine'} />
          HOSHI KAITO
        </ListItem>
        <ListItem>
          <ListIcon as={FaBirthdayCake} color={'mediumaquamarine'} />
          2002/12/10
        </ListItem>
        <ListItem>
          <ListIcon as={GiSkills} color={'mediumaquamarine'} />
          Java Python JavaScript TypeScript
        </ListItem>
        <ListItem>
          <ListIcon as={FaGamepad} color={'mediumaquamarine'} />
          Programming Anime VideoGame
        </ListItem>
      </List>
      <Text
        mt={'15px'}
        fontSize={{ base: 'sm', sm: 'md', xl: 'xl' }}
        color={'red.300'}
      >
        Lizariは本名ではなくハンドルネームです。
      </Text>
    </Box>
  );
};

export default ProfileCard;
