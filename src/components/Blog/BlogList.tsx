import React from "react";
import {Box, SimpleGrid} from "@chakra-ui/react";
import BlogListCard from "@/components/Blog/BlogListCard";

type Props = {
    posts: Array<{
        slug: string,
        data: {[key: string]: any}
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
                            title={post.data.title}
                            date={post.data.date}
                            description={post.data.description}
                            thumbnail={post.data.thumbnailUrl}
                            tags={post.data.tags}/>
                    ))}
                </SimpleGrid>
            </Box>
        </div>
    )
}

export default BlogList;