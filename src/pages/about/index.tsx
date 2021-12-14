import Header from "@/components/Common/Header";
import {Box, Container, Image, Text} from "@chakra-ui/react";
import React from "react";
import AboutCard from "@/components/About/AboutCard";
import FadeIn from "@/components/Common/FadeIn";

export default function AboutMe() {
    return(
        <div>
            <Container maxW={"5xl"}>
                <Header title={"About me"}/>
                <FadeIn>
                    <Box mt={"10vh"}
                         align={"center"}>
                        <Box>
                            <Image boxSize={{base: "200px", md: "300px"}}
                                   rounded={"80%"}
                                   objectFit={"cover"}
                                   boxShadow={"2xl"}
                                   alt={"profile icon"}
                                   src={"https://avatars.githubusercontent.com/u/39207967?v=4"}/>
                            <Text fontWeight={"hairline"}
                                  fontSize={{base: "40px", md: "70px"}}>
                                Lizari
                            </Text>
                        </Box>
                    </Box>
                </FadeIn>
                <AboutCard column={"Profile"}>
                    <Text>Name: Lizari</Text>
                    <Text>Birthday: 2002/12/10</Text>
                </AboutCard>
            </Container>
        </div>
    )
}