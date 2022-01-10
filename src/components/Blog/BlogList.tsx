import React from "react";
import {Box, SimpleGrid} from "@chakra-ui/react";
import BlogListCard from "@/components/Blog/BlogListCard";

type Props = {
    posts: Array<{
        [key: string]: any
    }>
}

const BlogList: React.VFC<Props> = (props) => {
    return(
        <div>
            <Box align={"center"}>
                <SimpleGrid minChildWidth={"300px"} spacingY={"20px"}>
                    {props.posts.map((post, index) => (
                        <BlogListCard
                            slug={post.slug}
                            title={post.title}
                            date={post.date}
                            description={post.description}
                            thumbnail={post.thumbnail}
                            tags={post.tags}/>
                    ))}
                </SimpleGrid>
            </Box>
        </div>
    )
}

export default BlogList;