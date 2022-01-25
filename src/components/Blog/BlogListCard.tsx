import {Box, Text, Image, Flex, Tag, Link, TagLabel} from "@chakra-ui/react";
import React from "react";
import {Post} from "@/entity/Post";
import {useRouter} from "next/router";
import DatetimeUtil from "@/utils/DatetimeUtil";

const BlogListCard: React.VFC<Post> = (props) => {
    const router = useRouter();
    const handleLinkClick = (url: string) => router.push(url);

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
                              onClick={() => handleLinkClick("/blog/" + props.meta.slug)}>{props.title}</Link>
                        <Text color={'gray.400'}
                              align={"left"}
                              fontSize={{base: "sm", sm: "md"}}>Last update: {DatetimeUtil.translate(DatetimeUtil.parse(props.meta.posted_by))}</Text>
                    </Box>
                </Box>
            </Box>
        </div>
    );
}

export default BlogListCard;