import React from "react";
import {
    Box,
    SimpleGrid, Switch,
    Text, useColorMode,
} from "@chakra-ui/react";
import FadeIn from "@/components/FadeIn";
import Head from "next/head";
import Profile from "@/components/Profile";
import Product from "@/components/Product";
import Contact from "@/components/Contact";

export default function Home() {
    const { colorMode, toggleColorMode } = useColorMode();

    return(
        <div>
            <Head>
                <title>XPS's portfolio</title>
            </Head>
            <Box
                bgGradient="linear(to top right, #3E4756,#55586E,#706984,#8E7A98,#B08BAA,#D29CB7)"
                display="block"
                p="20px">
                <Box display="flex" justifyContent="flex-end" mb="20vh">
                    <Switch size="lg" colorScheme="gray" onChange={() => toggleColorMode()} />
                </Box>
                <FadeIn>
                    <Box mb="40vh">
                        <Text textAlign="center" fontSize="9xl">
                            XPS's site
                        </Text>
                        <Text textAlign="center" fontSize="8xl">
                            Student
                        </Text>
                    </Box>
                </FadeIn>
                <FadeIn>
                    <Box>
                        <SimpleGrid columns={3} spacingX={10} spacingY={1} minHeight="30vh">
                            <Profile/>
                            <Product/>
                            <Contact/>
                        </SimpleGrid>
                    </Box>
                </FadeIn>
            </Box>
        </div>
    )
}