import Header from "@/components/Common/Header";
import BlogList from "@/components/Blog/BlogList";
import {Box, Center, Container, Spinner} from "@chakra-ui/react";
import React from "react";
import Fetcher from "@/utils/Fetcher";

export default function Blog() {
    const { posts, isLoading, isError } = Fetcher.usePosts(true);
    return(
        <div>
            <Container maxW={"5xl"}>
                <Header title={"Blog"}/>
                <Box
                    mt={{base: 20, md: 20}}
                    spacing={{base: 8, md: 10}}
                    py={{base: 20, md: 28}}>
                    {isLoading || isError || !posts ? <Center><Spinner/></Center> : <BlogList posts={posts}/>}
                </Box>
            </Container>
        </div>
    )
}