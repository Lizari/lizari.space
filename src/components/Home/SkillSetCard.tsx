import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';

const SkillSetCard = () => {
  return (
    <Box borderWidth={'1px'} borderRadius={'3%'} w={'full'} p={'15px'}>
      <Text
        textAlign={'center'}
        fontSize={{ base: 'xl', md: '3xl', xl: '4xl' }}
      >
        Skill set
      </Text>
      <Text mt={'15px'} fontSize={{ base: 'sm', sm: 'md', xl: 'md' }}>
        実務経験は無く、全て個人の趣味としてやってきました。広く浅く主にバックエンドを中心にやってきました。
        <br />
        フロントエンドをやったことがなくこのサイトで始めて体験してる感じです。
        <br />
        今まで作ってきたものはGitHubにアップロードしています。諸事情もあるので全て上げているわけではないので悪しからず。
      </Text>
      <Tabs mt={'5vh'}>
        <TabList>
          <Tab>Language</Tab>
          <Tab>Database</Tab>
          <Tab>DevOps</Tab>
        </TabList>
        <TabPanels textAlign={'start'}>
          <TabPanel>
            <Text fontSize={'25px'}>Java 約2年</Text>
            一番最初に学び始めたプログラミング言語です。どの言語よりも一番理解しやすくて好きな言語です。
            <br />
            <Text fontSize={'25px'}>Python 約5ヶ月</Text>
            手短に開発してみたいということでJavaの次に学び始めた言語です。今でも簡単なHTTP
            Requestとか送る際はPython使ってます。
            <br />
            <Text fontSize={'25px'}>JavaScript & TypeScript 約6ヶ月</Text>
            他の人に頼んで作ってもらったAPIサーバーに機能を追加したくて自分で学び始めた言語です。JavaScriptのコード書くのちょっと苦手です。TypeScriptは好き。
            <br />
          </TabPanel>
          <TabPanel>
            MySQL, SQLite, Redis
            <br />
          </TabPanel>
          <TabPanel>
            Docker, Docker Compose, Linux (Ubuntu), Google Compute Engine
            <br />
            <br />
            <p>
              触ったことはありますがそこまで理解していません。書籍を買って勉強してる最中です。
            </p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default SkillSetCard;
