import {Box, Flex, Text, VStack} from "@chakra-ui/react";
import {FaIdCard, FaMailBulk} from "react-icons/fa";
import React from "react";
import FadeIn from "@/components/FadeIn";

const Contact: React.VFC = () => {
    return(
        <FadeIn>
            <Box border={"1px solid"} borderRadius={"8px"}>
                <Box
                    mb="4px"
                    display="flex"
                    alignItems="flex-start"
                    justifyContent="center">
                    <Box pt={"8px"} pr={"4px"}>
                        <FaIdCard width="40px" height="40px" size={"40px"}/>
                    </Box>
                    <Text fontSize="4xl">
                        Contact
                    </Text>
                </Box>
                <Box minH={"25vh"} justifyContent={"center"} alignItems={"center"}>
                    <VStack spacing={5} pt={"10vh"}>
                        <Flex><FaMailBulk size={"40px"}/><Text fontSize={"xl"} ml={"10px"}>xxx@gmail.com</Text></Flex>
                    </VStack>
                </Box>
            </Box>
        </FadeIn>
    )
}

export default Contact;