import Header from "@/components/Common/Header";
import BlogList from "@/components/Blog/BlogList";
import {InferGetStaticPropsType} from "next";
import {Box, Container} from "@chakra-ui/react";
import React from "react";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

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

type Post = {
    slug: string,
    title: string,
    date: string,
    description: string,
    thumbnail?: string,
    tags: Array<string>,
    content: string,
}

type PostInfo = {
    slug: string,
    posted_by: string,
    updated_by: string,
}

type Posts = {
    posts: PostInfo[],
}


export const getStaticProps = async () => {
    const END_POINT = process.env.API_URL! + "/blogs";
    const apiRequest = (): Promise<Posts> => fetch(END_POINT).then((x) => x.json());
    const list = await apiRequest();
    const posts: Post[] = [];

    if (list.posts) {
        await Promise.all(list.posts.map(async (post: any) => {
            const data: Post = await fetch(process.env.API_URL! + `/blog/${post.slug}`)
                .then((res) => {
                    return res.json()
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