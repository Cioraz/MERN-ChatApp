import { Box, Container, Text } from '@chakra-ui/react'
import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from "../components/authentication/Login";
import SignUp from '../components/authentication/SignUp';

const home = () => {
    return (
        <Container maxW='xl' centerContent>
            <Box
                d='flex'
                justifyContent='center'
                p={3}
                w="100%"
                m="40px 0 15px 0"
                bg="#8ecae6"
                borderRadius="lg"
                borderWidth="1px"
            >
                <Text fontSize="4xl" color="black" textAlign='center'>Your Chat</Text>
            </Box>
            <Box bg="#8ecae6" w="100%" p={4} borderRadius="lg" borderWidth="1px">
                <Tabs>
                    <TabList mb="1em">
                        <Tab width="50%">Login</Tab>
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
