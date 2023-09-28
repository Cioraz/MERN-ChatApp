// Importing all required libraries
import React, { useState } from 'react'
import { VStack, FormControl, FormLabel, InputGroup, InputRightElement, Button, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { Input } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'


// Creating the Login Page
const Login = () => {
    // Setting all required variables
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const toast = useToast();

    // For handling the click to show or not show the password
    const handleClick = () => setShow(!show);

    // The handler to submit the data and check for validations
    const submitHandler = async () => {
        // When data is being submitted to show the loading
        setLoading(true);
        if (!email || !password) {
            toast({
                title: "Please fill all fields!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                }
            };

            const { data } = await axios.post("/api/user/login", { email, password }, config);

            toast({
                title: "Login Successful!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            history.push("/chats");
        } catch (error) {
            toast({
                title: "Error Occured!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
                description: error.response.data.message,
            });
            setLoading(false);
        }
    };

    return (
        <VStack spacing='20px'>
            <FormControl id='email' isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    placeholder='Enter Your Email'
                    bg="black"
                    borderColor="black"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? 'text' : "password"}
                        placeholder='Enter Your Password'
                        bg="black"
                        borderColor="black"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button
                colorScheme='blue'
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            > Login

            </Button>

        </VStack>
    )
}

export default Login
