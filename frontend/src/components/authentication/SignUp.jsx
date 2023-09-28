// All required imports
import React, { useState } from 'react'
import { VStack, FormControl, FormLabel, InputGroup, InputRightElement, Button, useToast } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

// SignUp function
const SignUp = () => {
    const [show_p, setShow_p] = useState(false);
    const [show_cp, setShow_cp] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmPassword] = useState();
    const [password, setPassword] = useState();
    const [pic, setPic] = useState();
    // To bring the loading animation when submitting the data
    const [loading, setLoading] = useState(false);
    // To bring the small message when loggin in the user or when displaying an error
    const toast = useToast();
    // To change the pages when the user is logged in or registered
    const history = useHistory();


    const handleClick_p = () => setShow_p(!show_p);
    const handleClick_cp = () => setShow_cp(!show_cp);

    // To post the image to cloudinary using API calls
    const postDetails = (pic) => {
        // To display that the image is being loaded when called
        setLoading(true);

        // Checking if the type of image is jpeg or png
        if (pic.type === "image/jpeg" || pic.type === "image/png") {

            // Creating a form Data to store the image so that it can be passed to cloudinary
            const data = new FormData();

            // Cloudinary method to upload files
            data.append("file", pic);
            data.append("upload_preset", "yourChat");
            data.append("cloud_name", "dpjwtpcsm");
            fetch("https://api.cloudinary.com/v1_1/dpjwtpcsm/image/upload", {
                method: "post",
                body: data,
            }).then((res) => res.json())
                .then((data) => {
                    setPic(data.url.toString());
                    console.log(data.url.toString());
                    // Since file has been loaded
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    // Error so file stops uploading
                    setLoading(false);
                })

        } else {
            toast({
                title: "Please Select an Image!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
    }

    // When submitted all the data
    const submitHandler = async () => {
        // Load the form 
        setLoading(true);
        if (!name || !email || !password || !confirmpassword) {
            toast({
                title: "Please fill all fields!",
                status: "error",
                during: 5000,
                isClosable: true,
                position: "top",
            });
            setLoading(false);
            return;
        }

        if (password !== confirmpassword) {
            toast({
                title: "Passwords Do Not Match!",
                status: "error",
                during: 5000,
                isClosable: true,
                position: "top",
            });
            setLoading(false);
            return;
        }

        // Since the application is being submitted we need to provide this
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                }
            };

            // The data containing the pic and all other stuff is sent using the axios post as it is already included in the proxy section
            const { data } = await axios.post('/api/user', { name, email, password, pic }, config);

            toast({
                title: "Registration Successful!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            })

            // Storing the data onto the local storage for development
            localStorage.setItem('userInfo', JSON.stringify(data));

            // Since loaded
            setLoading(false);

            // Moving onto the chats page
            history.push('/chats');

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
    }


    return (
        <VStack spacing='5px'>
            <FormControl id='first-name' isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder='Enter Your Name'
                    bg="black"
                    borderColor="black"
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>
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
                        type={show_p ? 'text' : "password"}
                        placeholder='Enter Your Password'
                        bg="black"
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
                        bg="black"
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
                    bg="black"
                    accept='image/*'
                    onChange={(e) => postDetails(e.target.files[0])}
                />
            </FormControl>
            <Button
                colorScheme='blue'
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            > Sign Up

            </Button>

        </VStack>
    )
}

export default SignUp
