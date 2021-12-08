import {Box, Button, Stack, Text, VStack} from "@chakra-ui/react";
import {FaGithub, FaSpotify, FaTwitch, FaTwitter, FaUser} from "react-icons/fa";
import React from "react";
import FadeIn from "@/components/FadeIn";

const Profile: React.VFC = () => {
    return(
        <FadeIn>
            <Box border={"1px solid"} borderRadius={"8px"}>
                <Box
                    mb="4px"
                    display="flex"
                    alignItems="flex-start"
                    justifyContent="center">
                    <Box pt={"8px"} pr={"4px"}>
                        <FaUser width="40px" height="40px" size={"40px"}/>
                    </Box>
                    <Text fontSize="4xl">
                        Profile
                    </Text>
                </Box>
                <Box minHeight={"25vh"}>
                    <VStack alignItems={"baseline"} ml={"10px"} fontSize={"xl"} spacing={2}>
                        <Stack spacing={6} direction={"row"}>
                            <Text>BirthDay:</Text><Text>2002/12/10</Text>
                        </Stack>
                        <Stack spacing={6} direction={"row"}>
                            <Text>License:</Text>
                            <Text>
                                普通自動車第一種運転免許<br/>
                                B検 3級<br/>
                            </Text>
                        </Stack>
                        <Stack spacing={6} direction={"row"}>
                            <Text>Hobby:</Text>
                            <Text>
                                Playing games<br/>
                                Do something with programming<br/>
                            </Text>
                        </Stack>
                    </VStack>
                    <Stack mt={"25px"} alignItems={"center"} justifyContent={"center"} direction={"row"} spacing={3}>
                        <Button as={"a"} aria-label={"to Github"} bgColor={"#14171A"} color={"white"} leftIcon={<FaGithub/>} href={"https://github.com/Lizari"}>GitHub</Button>
                        <Button as={"a"} aria-label={"to Twitter"} bgColor={"#1DA1F2"} color={"white"} leftIcon={<FaTwitter/>} href={"https://twitter.com/XPS_mun"}>Twitter</Button>
                        <Button as={"a"} aria-label={"to Twitch"} bgColor={"#6441a5"} color={"white"} leftIcon={<FaTwitch/>} href={"https://twitch.tv/xps_mun"}>Twitch</Button>
                        <Button as={"a"} aria-label={"to Spotify"} bgColor={"#1DB954"} color={"white"} leftIcon={<FaSpotify/>} href={"https://open.spotify.com/user/di8gfn91byu4ltgepkecjawve"}>Spotify</Button>
                    </Stack>
                </Box>
            </Box>
        </FadeIn>
    )
}

export default Profile;