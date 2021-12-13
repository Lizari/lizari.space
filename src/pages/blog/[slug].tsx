import fs from "fs";
import path from "path";
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
                            pt={"10vh"}>
                            <Text fontSize={{base: "16px", sm: "18px", md: "22px"}}>
                                <div dangerouslySetInnerHTML={{__html: props.content}}/>
                            </Text>
                        </Box>
                    </VStack>
            </Container>
        </div>
    )
}


export function getStaticPaths() {
    const files = fs.readdirSync(path.join("posts"))
    const paths = files.map(filename => ({
        params: {
            slug: filename.replace(".md", ""),
        },
    }))

    return {
        paths,
        fallback: false
    }
}

type Props = {
    data: {[key: string]: any},
    slug: string,
    content: string
}

interface Params extends ParsedUrlQuery {
    slug: string,
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params,}) => {
    const slug = params!.slug.toString()
    const markdownWithMeta = fs.readFileSync(path.join("posts", slug + ".md"), "utf-8")
    let {data, content} = matter(markdownWithMeta)
    content = await markdownToHtml(content);

    return {
        props: {
            data,
            slug,
            content
        },
        revalidate: 1
    }
}