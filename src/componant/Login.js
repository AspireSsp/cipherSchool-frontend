import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react'

  export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const toast = useToast()

    const loginUser = async()=>{
      try {
        // console.log('clickedddd')
        const data = { email, password};
        const res =  await axios.post('https://cipherschool-backend-7j25.onrender.com/api/v1/login', data)
        if(res.status== 200 || res.status==201){
          // console.log(res);
          localStorage.setItem('userData', JSON.stringify(res.data.userLogin));
          navigate('/')
          toast({
            title: res.data.message,
            status: 'success',
            isClosable: true,
          })
        }
      } catch (error) {
        toast({
          title: error.response.data.Error,
          status: 'error',
          isClosable: true,
        })
      }
    }
    return (
      <Box>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Log in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy add video streaming... <Link color={'blue.400'}>features</Link> ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" onChange={(e)=>{setEmail(e.target.value)}}/>
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" onChange={(e)=>{setPassword(e.target.value)}} />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  onClick={loginUser}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Log in
                </Button>
                <Stack pt={6}>
                <Text align={'center'}>
                  new user? <Link color={'blue.400'} to='/signup'>Sign Up</Link>
                </Text>
              </Stack>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
      </Box>
    );
  }