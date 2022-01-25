import React from "react";
import {Box, SimpleGrid} from "@chakra-ui/react";
import {Post} from "@/entity/Post";
import DatetimeUtil from "@/utils/DatetimeUtil";
import BlogListCard from "@/components/Blog/BlogListCard";

const BlogList: React.VFC<{
    posts: Array<Post>,
}> = (props) => {
    return(
        <div>
            <Box align={"center"}>
                <SimpleGrid minChildWidth={"300px"} spacingY={"20px"}>
                    {props.posts.sort((a: Post, b: Post) => {
                        return DatetimeUtil.compare(DatetimeUtil.parse(a.meta.posted_by), DatetimeUtil.parse(b.meta.posted_by))
                    }).map((post: Post) => {
                       return <BlogListCard {...post}/>
                    })}
                </SimpleGrid>
            </Box>
        </div>
    )
}

export default BlogList;