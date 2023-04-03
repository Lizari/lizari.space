import { Box, List, ListItem, Text } from '@chakra-ui/react';

const ProfileCard: React.FC = () => {
  return (
    <Box maxW={'100%'}>
      <Text as={'u'} fontSize={'2xl'} fontWeight={'semibold'}>
        Bio
      </Text>
      <List flexWrap={'wrap'} justifyContent={'space-between'}>
        <ListItem display={'flex'}>
          <Text
            textAlign={'right'}
            fontWeight={'bold'}
            p={'0.5em 1.0em 0.5em 0.5em'}
          >
            2002
          </Text>
          <Box
            borderLeft={'2px'}
            borderColor={'black'}
            width={'calc(100% - 4.5em)'}
            p={'0.5em 2.0em 3.0em'}
          >
            <Text fontWeight={'semibold'}>出身地</Text>
            <Text>宮城県で生まれた</Text>
          </Box>
        </ListItem>
        <ListItem display={'flex'}>
          <Text
            textAlign={'right'}
            fontWeight={'bold'}
            p={'0.5em 1.0em 0.5em 0.5em'}
          >
            2020
          </Text>
          <Box
            borderLeft={'2px'}
            borderColor={'black'}
            width={'calc(100% - 4.5em)'}
            p={'0.5em 2.0em 3.0em'}
          >
            <Text fontWeight={'semibold'}>プログラミングを知る</Text>
            <Text>
              高校3年生の時に、Minecraftを通してプログラミングに興味を抱き学び始めた
            </Text>
          </Box>
        </ListItem>
      </List>
    </Box>
  );
};

export default ProfileCard;
