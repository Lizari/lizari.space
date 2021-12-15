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
            <Box maxW={{base: "300px", md: "350px", lg: "400px"}}
                 boxShadow={"lg"}
                 borderWidth={"1px"}
                 borderRadius={"lg"}
                 overflow={"hidden"}
                 bgColor={"white"}>
                <Link href={"/blog/" + props.slug}>
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
                                  href={"/blog/" + props.slug}>{props.title}</Link>
                            <Text color={'gray.500'}
                                  fontSize={{base: "sm", sm: "md"}}
                                  mb={"10px"}>{props.description}</Text>
                            <Text color={'gray.400'}
                                  align={"left"}
                                  fontSize={{base: "sm", sm: "md"}}>{props.date}</Text>
                        </Box>
                    </Box>
                </Link>
            </Box>
        </div>
    );
}

export default BlogListCard;