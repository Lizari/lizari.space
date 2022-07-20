import {
  HStack,
  IconButton,
  Link,
  Spacer,
  useColorMode,
} from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

type HeaderProps = {
  title: string;
  path: string;
  description?: string;
  image?: string;
};

const Header: React.VFC<HeaderProps> = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const description: string = props.description ?? "Lizari's Website";

  return (
    <div>
      <Head>
        <title>{`Lizari.space - ${props.title}`}</title>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <meta name={'description'} content={description} />
        <meta
          property={'og:url'}
          content={`https://web.lizari.space/${props.path}`}
        />
        <meta property={'og:site_name'} content={props.title} />
        <meta property={'og:description'} content={description} />
        <meta property={'og:type'} content={'website'} />
        {props.image ? (
          <meta property={'og:image'} content={props.image} />
        ) : null}
        <link
          rel={'canonical'}
          href={`https://web.lizari.space/${props.path}`}
        />
      </Head>
      <HStack spacing={5} mt={'20px'} fontWeight={'hairline'}>
        <Link href={'/'} fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}>
          Home
        </Link>
        <Link href={'/blog'} fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}>
          Blog
        </Link>
        <Spacer />
        <IconButton
          icon={
            colorMode == 'dark' ? (
              <FaMoon size={'42px'} />
            ) : (
              <FaSun size={'42px'} />
            )
          }
          aria-label={'Dark mode switch'}
          size={'32px'}
          bg={'none'}
          _focus={{ _focus: 'none' }}
          onClick={() => toggleColorMode()}
        />
      </HStack>
    </div>
  );
};

export default Header;
