import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: false,
}
const breakpoints = createBreakpoints({
    base: '12px',
    sm: '20em',
    md: '32em',
    lg: '52em',
    xl: '68em',
    '2xl': '82em',
});

const theme = extendTheme({ config, breakpoints: breakpoints })

export default theme;