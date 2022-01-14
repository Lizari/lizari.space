import Header from "@/components/Common/Header";
import BlogList from "@/components/Blog/BlogList";
import {InferGetStaticPropsType} from "next";
import {Box, Container} from "@chakra-ui/react";
import React from "react";
import {Post} from "@/entity/Post";
import {PostInfo} from "@/entity/PostInfo";

type Props = InferGetStaticPropsType<typeof getServerSideProps>;

export default function Blog(props: Props) {
    return(
        <div>
            <Container maxW={"5xl"}>
                <Header title={"Blog"}/>
                <Box
                    mt={{base: 20, md: 20}}
                    spacing={{base: 8, md: 10}}
                    py={{base: 20, md: 28}}>
                    <BlogList posts={props.posts}/>
                </Box>
            </Container>
        </div>
    )
}


export const getServerSideProps = async () => {
    const END_POINT = process.env.API_URL! + "/blogs";
    const apiRequest = (): Promise<{
        posts: PostInfo[]
        }> => fetch(END_POINT).then((x) => x.json());
    const list = await apiRequest();
    const posts: Post[] = [];

    if (list.posts) {
        await Promise.all(list.posts.map(async (info: PostInfo) => {
            const data: Post = await fetch(process.env.API_URL! + `/blog/${info.slug}`)
                .then((res) => {
                    return res.json();
                })
                .catch((err) => console.log(err))
            posts.push(data);
        }));
    }

    return {
        props: {
            posts
        }
    }
}