import matter from "gray-matter";
import Header from "@/components/Common/Header";
import {
    Box,
    Container, HStack,
    Text,
    VStack
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import markdownToHtml from "@/utils/markdownToHtml";
import "highlight.js/styles/atom-one-dark-reasonable.css"
import Fetcher from "@/utils/Fetcher";
import {useRouter} from "next/router";
import DatetimeUtil from "@/utils/DatetimeUtil";
import {MdOutlineLocalPostOffice} from "react-icons/md";

export default function Page() {
    const router = useRouter();
    const [slug, setSlug] = useState("");

    useEffect(() => {
        if (router && router.query) setSlug(router.query.slug! as string);
    }, [router]);

    const { post, isLoading, isError } = Fetcher.usePost(slug);

    if (isLoading || !post) return (<div><Header title={"Now Loading"}/></div>)
    if (isError) return (<div><Header title={"Error!"}/></div>)

    return (
        <div>
            <Container maxW={"5xl"}>
                <Header title={post.title}/>
                <VStack
                    max={"3xl"}
                    mt={{base: "40px", md: "80px"}}>
                    <Box pt={"20px"}>
                        <Text fontWeight={"bold"}
                              fontSize={{base: "20px", sm: "40px", md: "50px"}}>
                            {post.title}
                        </Text>
                    </Box>
                    <HStack>
                        <MdOutlineLocalPostOffice size={"42px"}/>
                        <Text fontSize={{base: "20px", md: "30px"}}>{DatetimeUtil.translate(DatetimeUtil.parse(post.meta.posted_by))}</Text>
                    </HStack>
                    <Box
                        maxW={"3xl"}
                        fontSize={{base: "15px", sm: "18px", md: "22px"}}
                        pt={"10vh"}>
                        <div dangerouslySetInnerHTML={{__html: base64Decoder(post.content)}}/>
                    </Box>
                </VStack>
            </Container>
        </div>
    )
}

function base64Decoder(content: string) {
    const buffer = Buffer.from(content, "base64");
    const obj = buffer.toString("utf8");

    return markdownToHtml(matter(obj).content);
}