import { AppProps } from "next/app";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import React from "react";
import theme from "@/components/Common/Theme";

export default function App({ Component, pageProps }: AppProps) {
    return(
        <ChakraProvider>
            <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
            <Component {...pageProps} />
        </ChakraProvider>
    )
}