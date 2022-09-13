import { Box, Text } from '@chakra-ui/react';

const HobbyCard: React.FC = () => {
  return (
    <Box>
      <Text as={'u'} fontSize={'2xl'} fontWeight={'semibold'}>
        ♥ Hobby
      </Text>
      <Text>アニメ鑑賞、ゲーム、プログラミング</Text>
    </Box>
  );
};

export default HobbyCard;
