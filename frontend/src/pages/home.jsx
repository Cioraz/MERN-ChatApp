import React from 'react'
import { Box, Container, Text, Stack, HStack, VStack, Tabs, TabList, TabPanels, Tab, TabPanel, Image } from '@chakra-ui/react'
import Login from "../components/authentication/Login";
import SignUp from '../components/authentication/SignUp';
import ReactTyped from "react-typed";

const home = () => {
    return (
        <Container maxW='xl' centerContent>
            <Box
                d='flex'
                justifyContent='center'
                p={6}
                pb={35}
                w="100%"
                m="40px 0 15px 0"

            >
                <Text fontSize="8xl" color="white" textAlign='center'>YourChat</Text>
                <Text fontSize="5xl" color="whiteAlpha.500" textAlign='center'><ReactTyped strings={["- A Real Time Chat"]} typeSpeed={100} loop /></Text>
            </Box>
            <Box bg="#282828" w="100%" p={4} borderRadius="lg" borderWidth="1px" opacity={0.8}>
                <Tabs size='lg'  >
                    <TabList mb="1em">
                        <Tab width="50%"
                        >Login</Tab>
                        <Tab width="50%">Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            {<Login />}
                        </TabPanel>
                        <TabPanel>
                            {<SignUp />}
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container >
    )
}

export default home
