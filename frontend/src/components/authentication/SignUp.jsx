import React, { useState } from 'react'
import { Stack, HStack, VStack, FormControl, FormLabel, InputGroup, InputRightElement, Button } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'

const SignUp = () => {
    const [show_p, setShow_p] = useState(false);
    const [show_cp, setShow_cp] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmPassword] = useState();
    const [password, setPassword] = useState();
    const [pic, setPic] = useState();

    const handleClick_p = () => setShow_p(!show_p);
    const handleClick_cp = () => setShow_cp(!show_cp);
    const postDetails = (pics) => {

    }
    const submitHandler = () => {

    }

    return (
        <VStack spacing='5px'>
            <FormControl id='first-name' isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder='Enter Your Name'
                    bg="white"
                    borderColor="black"
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>
            <FormControl id='email' isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    placeholder='Enter Your Email'
                    bg="white"
                    borderColor="black"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show_p ? 'text' : "password"}
                        placeholder='Enter Your Password'
                        bg="white"
                        borderColor="black"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick_p}>
                            {show_p ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id='password' isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show_cp ? 'text' : "password"}
                        placeholder='Confirm Password'
                        bg="white"
                        borderColor="black"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick_cp}>
                            {show_cp ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id='pic' isRequired>
                <FormLabel>Upload your Picture</FormLabel>
                <Input
                    type="file"
                    p={1.5}
                    accept='image/*'
                    onChange={(e) => postDetails(e.target.files[0])}
                />
            </FormControl>
            <Button
                colorScheme='blue'
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
            > Sign Up

            </Button>

        </VStack>
    )
}

export default SignUp
