import {Box, Text, Image, Flex, Tag, Link, TagLabel} from "@chakra-ui/react";
import React from "react";

type BlogCard = {
    slug: string,
    title: string,
    date: string,
    description: string,
    thumbnail: string,
    tags: [string]
}

const BlogListCard: React.VFC<BlogCard> = (props) => {
    return(
        <div>
            <Box maxW={"300px"} borderWidth={"1px"} borderRadius={"lg"} overflow={"hidden"} bgColor={"white"}>
                <Image src={props.thumbnail} alt={"thumbnail"}/>
                <Box p={"10px"}>
                    <Flex alignItems={"baseline"}>
                        {props.tags.map((value => (
                            <Tag color={"teal.400"} bgColor={"green.50"} display={"full"} mr={"3px"}>
                                <TagLabel>{value}</TagLabel>
                            </Tag>
                        )))}
                    </Flex>
                    <Box align={"left"}>
                        <Link color={"gray.900"} fontSize={{base: "sm", sm: "xl", xl: "2xl"}} fontWeight={"semibold"} href={"/blog/" + props.slug}>{props.title}</Link>
                        <Text color={'gray.500'} fontSize={{base: "sm", sm: "md"}} mb={"10px"}>{props.description}</Text>
                        <Text color={'gray.400'} fontSize={{base: "sm", sm: "md"}}>{props.date}</Text>
                    </Box>
                </Box>
            </Box>
        </div>
    );
}

export default BlogListCard;