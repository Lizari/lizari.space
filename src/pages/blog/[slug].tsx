import matter from "gray-matter";
import {GetServerSideProps} from "next";
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
import markdownToHtml from "@/utils/markdownToHtml";
import "highlight.js/styles/atom-one-dark-reasonable.css"
import {Post} from "@/entity/Post";

export default function Page(props: {
    post: Post,
    content: string
}) {
    return (
        <div>
            <Container maxW={"5xl"}>
                <Header title={props.post.title}/>
                    <VStack
                        max={"3xl"}
                        mt={{base: "40px", md: "80px"}}>
                        <Box pt={"20px"}>
                            <Text fontWeight={"bold"}
                                  fontSize={{base: "20px", sm: "40px", md: "50px"}}>
                                {props.post.title}
                            </Text>
                        </Box>
                        <HStack fontSize={{base: "20px", md: "30px"}}>
                            <Flex>
                                <Text>Posted: {props.post.meta.posted_by}</Text>
                            </Flex>
                            <Spacer/>
                            <Flex>
                                {props.post.tags.map(((value: string) => (
                                    <Tag color={"teal.400"}
                                         bgColor={"green.100"}
                                         mr={"5px"}
                                         bg={"none"}
                                         borderRadius={"5px"}
                                         //@ts-ignore
                                         size={{base: "20px", md: "30px"}}>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const slug = context.params?.slug as string;
    const post: Post = await fetch(process.env.API_URL! + `/blog/${slug}`).then((res) => res.json());

    const buffer = Buffer.from(post.content, "base64");
    const mdObj = buffer.toString("utf8");
    let { content } = matter(mdObj);

    content = markdownToHtml(content);

    return {
        props: {
            post: post,
            content: content
        }
    }
}