import matter from "gray-matter";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import Header from "@/components/Common/Header";
import {
    Box,
    Container,
    Flex, HStack,
    Spacer, Tag, TagLabel,
    Text,
    VStack
} from "@chakra-ui/react";
import React from "react";
import {ParsedUrlQuery} from "querystring";
import markdownToHtml from "@/utils/markdownToHtml";
import "highlight.js/styles/atom-one-dark-reasonable.css"

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Page(props: PageProps) {
    return (
        <div>
            <Container maxW={"5xl"}>
                <Header title={props.data.title}/>
                    <VStack
                        my={{base: "40px", md: "80px"}}>
                        <Box pt={"20px"}>
                            <Text fontWeight={"bold"}
                                  fontSize={{base: "20px", sm: "40px", md: "60px"}}>
                                {props.data.title}
                            </Text>
                        </Box>
                        <HStack fontSize={{base: "20px", md: "30px", xl: "40px"}}>
                            <Flex>
                                <Text>{props.data.date}</Text>
                            </Flex>
                            <Spacer/>
                            <Flex>
                                {props.data.tags.map(((value: string) => (
                                    <Tag mr={"5px"}
                                         bg={"none"}
                                         // @ts-ignore - なぜかサイズ指定の際エラーがでる
                                         size={{base: "20px", md: "30px", xl: "40px"}}>
                                        <TagLabel>{value}</TagLabel>
                                    </Tag>
                                )))}
                            </Flex>
                        </HStack>
                        <Box
                            maxW={"3xl"}
                            fontSize={{base: "15px", sm: "18px", md: "22px"}}
                            pt={"10vh"}>
                            <div dangerouslySetInnerHTML={{__html: props.content}}/>
                        </Box>
                    </VStack>
            </Container>
        </div>
    )
}


export async function getStaticPaths() {
    const END_POINT = process.env.API_URL! + "/blogs";
    const list = await fetch(END_POINT).then((x) => x.json());
    const paths = list.posts.map((post: { slug: string; }) => ({
        params: {
            slug: post.slug,
        },
    }))

    return {
        paths,
        fallback: false
    }
}

type Post = {
    slug: string,
    title: string,
    date: string,
    description: string,
    thumbnail?: string,
    tags: Array<string>,
    content: string,
}

type Props = {
    data: Post,
    content: string
}

interface Params extends ParsedUrlQuery {
    slug: string,
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params,}) => {
    const slug = params!.slug.toString();
    const mdInfo: Post = await fetch(process.env.API_URL! + `/blog/${slug}`)
    .then((res) => {
        return res.json();
    })

    const buffer = Buffer.from(mdInfo.content, "base64");
    const mdObj = buffer.toString("utf8");
    let { content } = matter(mdObj);

    content = markdownToHtml(content);

    return {
        props: {
            data: mdInfo,
            content: content
        }
    }
}