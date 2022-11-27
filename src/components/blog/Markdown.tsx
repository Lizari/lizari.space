import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Code,
  Divider,
  Image,
  Link,
  ListItem,
  OrderedList,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  UnorderedList,
  useColorMode,
} from '@chakra-ui/react';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  vs,
  vscDarkPlus,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

const Markdown: React.FC<{ content: string }> = (props) => {
  const { colorMode } = useColorMode();
  return (
    <ReactMarkdown
      remarkPlugins={[[remarkGfm, { singleTilde: false }], remarkBreaks]}
      components={{
        code: ({ inline, className, children, ...props }) => {
          const data: string | undefined = children[0]
            ?.toString()
            .split('\n')[0];
          const language: string | undefined = data?.split(':')[0];
          const filename: string | undefined = data?.split(':')[1];
          const match: RegExpExecArray | null = /language-(\w+)/.exec(
            language || '',
          );
          const inlineName: string = filename !== null ? filename + '\n' : '';
          const content = children[0]?.toString().replace(data!, '');

          return !inline && match ? (
            <SyntaxHighlighter
              // @ts-ignore overloadエラーがでる原因不明
              style={colorMode === 'dark' ? vscDarkPlus : vs}
              language={match[1]}
              PreTag={'div'}
              {...props}
            >
              {String(inlineName + content).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <Code className={className} {...props}>
              {children}
            </Code>
          );
        },
        li: (props) => {
          return (
            <ListItem fontSize={{ base: '16px', md: '17px' }}>
              {props.children}
            </ListItem>
          );
        },
        blockquote: (props) => {
          return <Code p={2}>{props.children}</Code>;
        },
        p: (props) => {
          return (
            <Text fontSize={{ base: '16px', md: '17px' }}>
              {props.children}
            </Text>
          );
        },
        h2: (props) => {
          return (
            <Text
              fontWeight={'extrabold'}
              fontSize={{ base: '20px', md: '45px', xl: '50px' }}
            >
              {props.children}
            </Text>
          );
        },
        h3: (props) => {
          return (
            <Text
              fontWeight={'semibold'}
              fontSize={{ base: '14px', md: '25px', xl: '35px' }}
            >
              {props.children}
            </Text>
          );
        },
        hr: () => {
          return <Divider orientation={'horizontal'} borderColor={'gray'} />;
        },
        strong: (props) => {
          return (
            <Text fontWeight={'semibold'} fontSize={{ sm: '16px', md: '18px' }}>
              {props.children}
            </Text>
          );
        },
        tr: (props) => {
          return <Tr>{props.children}</Tr>;
        },
        td: (props) => {
          return <Td>{props.children}</Td>;
        },
        th: (props) => {
          return <Th>{props.children}</Th>;
        },
        a: (props) => {
          return (
            <Link color={'teal.600'} href={props.href} isExternal>
              {props.children}
              <ExternalLinkIcon mx={'3px'} mb={'4px'} />
            </Link>
          );
        },
        ul: UnorderedList,
        ol: OrderedList,
        img: Image,
        table: Table,
        thead: Thead,
        tbody: Tbody,
      }}
      skipHtml
    >
      {props.content}
    </ReactMarkdown>
  );
};

export default Markdown;
