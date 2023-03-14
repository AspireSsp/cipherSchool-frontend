import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,

  } from '@chakra-ui/react';
  import { useToast } from '@chakra-ui/react'
  import React, { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import { Link, useNavigate } from "react-router-dom";
  import axios from 'axios';
  export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alart, setAlart] = useState(false);
    const [alartMsg, setAlartMsg] = useState('');
    const navigate = useNavigate();
    const toast = useToast()
    const toastIdRef = React.useRef()
    



    const registerUser = async()=>{
      try {
        // console.log('clickedddd')
        const data = {name, email, password};
        const res =  await axios.post('https://cipherschool-backend-7j25.onrender.com/api/v1/register', data)
        if(res.status== 200 || res.status==201){
          localStorage.setItem('userData', JSON.stringify(res.data.newUser));
          navigate('/')
          toast({
            title: res.data.message,
            status: 'success',
            isClosable: true,
          })
        }else{
          setAlart(true);
        }
      } catch (error) {
        setAlart(true);
        setAlartMsg(error.response.data.Error)
        toast({
          title: error.response.data.Error,
          status: 'error',
          isClosable: true,
        })
      }
    }

  
    return (
      
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} >
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            
            p={8}>
            <Stack spacing={4}>
            <FormControl id="lastName">
                <FormLabel>Your Name</FormLabel>
                <Input type="text" onChange={(e)=>{setName(e.target.value)}} />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" onChange={(e)=>{setEmail(e.target.value)}}  />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} onChange={(e)=>{setPassword(e.target.value)}}  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
             
                <Button
                  loadingText="Submitting"
                  size="lg"
                  onClick={registerUser}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link color={'blue.400'} to='/login'>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }