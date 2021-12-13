import Header from "@/components/Common/Header";
import BlogList from "@/components/Blog/BlogList";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
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

export const getStaticProps = async () => {
    /* Todo:
        file serverからfetchするようにする
    */
    const files = fs.readdirSync(path.join('posts'))
    const posts = files.map(filename => {
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')
    const { data } = matter(markdownWithMeta)
        return {
            data,
            slug: filename.split('.')[0]
        }
    })
    return {
        props: {
            posts
        }
    }
}