import {HStack, IconButton, Link, Spacer, useColorMode} from "@chakra-ui/react";
import React from "react";
import {FaMoon, FaSun} from "react-icons/fa";
import Head from "next/head";

const Header: React.VFC = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return(
        <HStack spacing={5}
                mt={"20px"}
                fontWeight={"semibold"}>
            <Link href={"/about"} fontSize={{base: "xl", sm: "2xl", md: "4xl"}}>About Me</Link>
            <Link href={"/blog"} fontSize={{base: "xl", sm: "2xl", md: "4xl"}}>Blog</Link>
            <Spacer/>
            <IconButton
                icon={colorMode == "dark" ?  <FaMoon size={"32px"}/>: <FaSun size={"32px"}/>}
                aria-label={"Dark mode switch"}
                size={"32px"}
                bg={"none"}
                _focus={{_focus: "none"}}
                onClick={() => toggleColorMode()}/>
        </HStack>
    )
}

export default Header;