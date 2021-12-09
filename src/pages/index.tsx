import React from "react";
import {
    Container, Heading, HStack, IconButton, Stack, Text
} from "@chakra-ui/react";
import Header from "@/components/Common/Header";
import {FaGithub, FaTwitch, FaTwitter} from "react-icons/fa";
import FadeIn from "@/components/Common/FadeIn";

export default function Home() {
    return(
        <div>
            <Head>
                <title>Lizari.space</title>
            </Head>
            <Container maxW={"5xl"}>
                <Header/>
                <FadeIn>
                    <Stack
                        textAlign={"center"}
                        align={"center"}
                        mt={{base: 20, md: 20}}
                        spacing={{base: 8, md: 10}}
                        py={{base: 20, md: 28}}>
                        <Heading textAlign="center"
                                 lineHeight={'110%'}
                                 fontSize={{base: "3xl", sm: "6xl", xl: "9xl"}}>Hi, I am Lizari</Heading>
                        <Text color={'gray.500'} fontSize={{base: "md", sm: "xl", xl: "2xl"}} maxW={'3xl'}>
                            Student - I like games and anime. I'm also a hobbyist when it comes to programming, and have experience with Java, Javascript, and Python.
                        </Text>
                        <HStack justifyContent={"center"}
                                pt={"10vh"}
                                spacing={10}
                                maxW={"3xl"}>
                            <IconButton
                                icon={<FaGithub size={"64px"}/>}
                                aria-label={"to Github"}
                                as={"a"}
                                size={"64px"}
                                bg={"none"}
                                _focus={{_focus: "none"}}
                                href={"https://github.com/Lizari"}/>
                            <IconButton
                                icon={<FaTwitter size={"64px"}/>}
                                aria-label={"to Twitter"}
                                as={"a"}
                                size={"64px"}
                                bg={"none"}
                                _focus={{_focus: "none"}}
                                href={"https://twitter.com/XPS_mun"}/>
                            <IconButton
                                icon={<FaTwitch size={"64px"}/>}
                                aria-label={"to Twitter"}
                                as={"a"}
                                size={"64px"}
                                bg={"none"}
                                _focus={{_focus: "none"}}
                                href={"https://twitch.tv/xps_mun"}/>
                        </HStack>
                    </Stack>
                </FadeIn>
            </Container>
        </div>
    )
}