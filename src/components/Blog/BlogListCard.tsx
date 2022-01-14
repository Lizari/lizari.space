import {Box, Text, Image, Flex, Tag, Link, TagLabel} from "@chakra-ui/react";
import React from "react";
import {Post} from "@/entity/Post";

const BlogListCard: React.VFC<Post> = (props) => {
    return (
        <div>
            <Box maxW={{base: "300px", md: "350px", lg: "400px"}}
                 boxShadow={"lg"}
                 borderWidth={"1px"}
                 borderRadius={"lg"}
                 overflow={"hidden"}
                 bgColor={"white"}>
                <Image src={props.thumbnail}
                       maxH={"300px"}
                       alt={"thumbnail"}/>
                <Box p={"10px"}>
                    <Flex>
                        {props.tags.map((value => (
                            <Tag color={"teal.400"}
                                 bgColor={"green.100"}
                                 mr={"3px"}>
                                <TagLabel>{value}</TagLabel>
                            </Tag>
                        )))}
                    </Flex>
                    <Box>
                        <Link color={"gray.900"}
                              fontSize={{base: "sm", sm: "xl", xl: "2xl"}}
                              fontWeight={"semibold"}
                              href={"/blog/" + props.meta.slug}>{props.title}</Link>
                        <Text color={'gray.500'}
                              fontSize={{base: "sm", sm: "md"}}
                              mb={"10px"}>{props.description}</Text>
                        <Text color={'gray.400'}
                              align={"left"}
                              fontSize={{base: "sm", sm: "md"}}>Last updated: {props.meta.posted_by}</Text>
                    </Box>
                </Box>
            </Box>
        </div>
    );
}

export default BlogListCard;