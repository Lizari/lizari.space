import {Box, Image, Stack, Text} from "@chakra-ui/react";
import React from "react";
import {FaProductHunt} from "react-icons/fa";
import FadeIn from "@/components/FadeIn";

const Product: React.VFC = () => {
    return(
        <FadeIn>
            <Box border={"1px solid"} borderRadius={"8px"}>
                <Box
                    mb="4px"
                    display="flex"
                    alignItems="flex-start"
                    justifyContent="center">
                    <Box pt={"8px"} pr={"4px"}>
                        <FaProductHunt size={"40px"}/>
                    </Box>
                    <Text fontSize="4xl">
                        Products
                    </Text>
                </Box>
                <Stack minHeight="25vh" spacing={4}>
                    <Box display={"flex"} alignItems="center">
                        <Image src={"/AtriaIcon.jpg"} fallbackSrc={"/FallbackIcon.png"} h={"64px"} w={"64px"} ml={"10px"} mr={"10px"}/><Text fontSize={"xl"} mb={"5px"}>Minecraft Server - Atria Network</Text>
                    </Box>
                    <Box display={"flex"} alignItems="center">
                        <Image fallbackSrc={"/FallbackIcon.png"} h={"64px"} w={"64px"} ml={"10px"} mr={"10px"}/><Text fontSize={"xl"} mb={"5px"}>LRC Parser</Text>
                    </Box>
                </Stack>
            </Box>
        </FadeIn>
    )
}

export default Product;