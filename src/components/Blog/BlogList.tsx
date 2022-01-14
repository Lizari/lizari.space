import React from "react";
import {Box, SimpleGrid} from "@chakra-ui/react";
import {Post} from "@/entity/Post";
import datetimeManger from "@/utils/datetimeManger";
import BlogListCard from "@/components/Blog/BlogListCard";

const BlogList: React.VFC<{
    posts: Array<Post>,
}> = (props) => {
    return(
        <div>
            <Box align={"center"}>
                <SimpleGrid minChildWidth={"300px"} spacingY={"20px"}>
                    {props.posts.sort((a, b) => {
                        return datetimeManger.compare(datetimeManger.parse(a.meta.posted_by), datetimeManger.parse(b.meta.posted_by))
                    }).map((post) => {
                       return <BlogListCard {...post}/>
                    })}
                </SimpleGrid>
            </Box>
        </div>
    )
}

export default BlogList;