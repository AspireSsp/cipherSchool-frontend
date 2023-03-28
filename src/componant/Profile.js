import { Avatar, Box, Divider, Flex, Spacer, Stack, Text, useColorModeValue , Button, InputGroup,InputLeftElement,Input,FormLabel,FormControl, Select, Badge, Wrap, Textarea } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState ,useEffect } from 'react'
import HeatMap from 'react-best-heatmap';


const Profile = (props) => {
    const values = [
        {
          date: new Date(),
          value: 1,
          valueLabel: 'Custom content...'
        }
      ];

     const [about, setAbout] = useState(false);
     const [aboutText, setAboutText] = useState(props?.user?.about);
     const [profInfo, setProfInfo] = useState(false)
     const [linkedIn, setLinkedIn] = useState(props?.user?.socialAccounts?.linkedIn);
     const [github, setGithub] = useState(props?.user?.socialAccounts?.github);
     const [facebook, setFacebook] = useState(props?.user?.socialAccounts?.facebook);
     const [instagram, setInstagram] = useState(props?.user?.socialAccounts?.instagram);
     const [twitter, setTwitter] = useState(props?.user?.socialAccounts?.twitter);
     const [website, setWebsite] = useState(props?.user?.socialAccounts?.website);
     const [selectInfo, setSelectInfo] = useState(false);
     const [currentJob, setCurrentJob] = useState(props?.user?.currentJob);
     const [highestEducation, setHighestEducation] = useState(props?.user?.highestEducation);

     const [password, setPassword] = useState("")
    console.log("meeeeee", props?.user);
    

     const saveAbout = async()=>{
        console.log("about is calling......")
        const body = {
            about : aboutText
        }
        const res = await axios.put(`http://localhost:5000/api/v1/updateUser/${props?.user?._id}`, body )
        console.log(res);
        props.success(res.data[0])
     }
     const saveProfInfo = async()=>{
        console.log("saveProfInfo is calling......")
        const body = {
            socialAccounts :{
                linkedIn, github, facebook, instagram, twitter, website
            }
        }
        const res = await axios.put(`http://localhost:5000/api/v1/updateUser/${props?.user?._id}`, body )
        console.log(res);
        props.success(res.data[0])
     }

     const saveSelectInfo = async()=>{
        console.log("saveProfInfo is calling......")
        const body = {
            highestEducation, currentJob
        }
        console.log("my bodyyy",body);
        const res = await axios.put(`http://localhost:5000/api/v1/updateUser/${props?.user?._id}`, body )
        console.log(res);
        props.success(res.data[0])
     }
  return (
    <Box m={0} mt={"5%"} bg={useColorModeValue('gray.100', 'gray.900')}>
        {/* <Text>hi sanhay7gshjdbknk vjhkancjnbu iuneuf huebffbeubu</Text> */}
        <Flex p={4} background={'white'}>
            <Stack direction={'row'} spacing={4} align={'center'}>
                <Avatar
                    src={'https://i.imgur.com/u0XHayQ.png'}
                    alt={'Author'}
                />
                <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                    <Text>Hello,</Text>
                    <Text fontWeight={700}>Achim Rolle</Text>
                    <Text color={'black'}>sanjaypraj@gmail.com</Text>
                </Stack>
            </Stack>
            <Spacer />
            <Stack align={'end'}>
                <Text>**2k followers</Text>
            </Stack>
        </Flex>

        <Box p={4} borderBottom={'1px solid lightGray'}>
                <Flex h={20} alignItems={'center'} justifyContent={'space-between'}>
                    <Box>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Text my={3} fontWeight={700} align='left'>ABOUT ME</Text>
                        </Flex>
                    </Box>
                    <Flex alignItems={'center'}>
                    {
                        about ?
                        <Button bg='#f3912e' onClick={()=>{about ? setAbout(false) : setAbout(true) ; saveAbout()}}>
                            Save
                        </Button> : 
                        <Button bg='#f3912e' onClick={()=>{about ? setAbout(false) : setAbout(true)}}>
                            Edit
                        </Button>
                    }
                    </Flex>
                </Flex>
            <Box p={2} background={'white'} borderRadius={'5px'}>
                <Textarea value={aboutText} placeholder='medium size'border={'none'} _focus={{boxShadow:'none'}} size='md' onChange={(e)=>{about ? setAboutText(e.target.value) : setAboutText(aboutText) }} />
                {/* <Text>Cipherschools is a bootstrapped educational video streaming platform in India that is connecting passionate unskilled students to skilled Industry experts to fulfill their career dreams.</Text> */}
            </Box>
        </Box>
        {/* <Divider color={"red.500"} /> */}
        <Box>
        <Box px={4} pb={5} bg='gray.100' borderBottom={'1px solid lightGray'}>
                <Flex h={20} alignItems={'center'} justifyContent={'space-between'}>
                    <Box>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Text my={3} fontWeight={700} align='left'>ON THE WEB</Text>
                        </Flex>
                    </Box>
                    <Flex alignItems={'center'}>
                    {
                        profInfo ?
                        <Button bg='#f3912e' onClick={()=>{profInfo ? setProfInfo(false) : setProfInfo(true) ; saveProfInfo()}}>
                            Save
                        </Button> : 
                        <Button bg='#f3912e' onClick={()=>{profInfo ? setProfInfo(false) : setProfInfo(true)}}>
                            Edit
                        </Button>
                    }
                    </Flex>
                </Flex>
                <Box width='100%'>
                    <Flex>
                        <Stack direction={'row'} mb={4} spacing={8}>
                            <FormControl>
                                <FormLabel>LinkedIn</FormLabel>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents='none'
                                        children={<img src='https://www.cipherschools.com/static/media/LinkedIn.297c3e0e0411d3b8a7946c85a72f2bc7.svg' />}
                                    />
                                    <Input value={linkedIn} bg='#FFFFFF' boxShadow='sm' htmlSize={50} width='100%' type='url' placeholder='LinkedIn' onChange={(e)=>{profInfo ? setLinkedIn(e.target.value) : setLinkedIn(linkedIn) }} />
                                </InputGroup>
                            </FormControl>

                            <FormControl>
                                <FormLabel>GitHub</FormLabel>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents='none'
                                        children={<img src='https://www.cipherschools.com/static/media/Github.2d6b6c0c10a3b3aa7e3c7438770688f8.svg' />}
                                    />
                                    <Input value={github} bg='#FFFFFF' htmlSize={50} width='100%' type='url' placeholder='GitHub' onChange={(e)=>{profInfo ? setGithub(e.target.value) : setGithub(github) }} />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel>FaceBook</FormLabel>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents='none'
                                        children={<img src='https://www.cipherschools.com/static/media/Facebook.766939726b802e2c4354f9629feba07f.svg' />}
                                    />
                                    <Input value={facebook} bg='#FFFFFF' htmlSize={50} width='100%' type='url' placeholder='FaceBook' onChange={(e)=>{profInfo ? setFacebook(e.target.value) : setFacebook(facebook) }} />
                                </InputGroup>
                            </FormControl>
                        </Stack>
                    </Flex>
                    <Flex>
                        <Stack direction={'row'} spacing={8}>
                            <FormControl>
                                <FormLabel>Twitter</FormLabel>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents='none'
                                        children={<img src='https://www.cipherschools.com/static/media/Twitter.8dec5dacebf84c0be8bcaa33dee4a7a0.svg' />}
                                    />
                                    <Input value={twitter} bg='#FFFFFF' htmlSize={50} width='100%' type='url' placeholder='Twitter' onChange={(e)=>{profInfo ? setTwitter(e.target.value) : setTwitter(twitter) }}/>
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Instagram</FormLabel>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents='none'
                                        children={<img src='https://www.cipherschools.com/static/media/Instagram.31ac5927c40b6d948dc3369a313cb7c9.svg' />}
                                    />
                                    <Input value={instagram} bg='#FFFFFF' htmlSize={50} width='100%' type='url' placeholder='Instagram' onChange={(e)=>{profInfo ? setInstagram(e.target.value) : setInstagram(instagram) }} />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Website</FormLabel>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents='none'
                                        children={<img src='https://www.cipherschools.com/static/media/Website.cd72366beefca5afbc5259237cf87838.svg' />}
                                    />
                                    <Input value={website} bg='#FFFFFF' htmlSize={50} width='100%' type='url' placeholder='Website' onChange={(e)=>{profInfo ? setWebsite(e.target.value) : setWebsite(website) }} />
                                </InputGroup>
                            </FormControl>
                        </Stack>
                    </Flex>
                </Box>
            </Box>
        </Box>
      
        <Box>
        <Box px={4} bg='gray.100' borderBottom={'1px solid lightGray'}>
                <Flex h={20} alignItems={'center'} justifyContent={'space-between'}>
                    <Box>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Text my={3} fontWeight={700} align='left'>PROFESSIONAL INFORMATION</Text>
                        </Flex>
                    </Box>
                    <Flex alignItems={'center'}>
                    {
                        selectInfo ?
                        <Button bg='#f3912e' onClick={()=>{selectInfo ? setSelectInfo(false) : setSelectInfo(true) ; saveSelectInfo()}}>
                            Save
                        </Button> : 
                        <Button bg='#f3912e' onClick={()=>{selectInfo ? setSelectInfo(false) : setSelectInfo(true)}}>
                            Edit
                        </Button>
                    }
                    </Flex>
                </Flex>
                <Box width='100%'>
                        <Stack width='100%' direction={'row'} mb={4} spacing={10}>
                            <FormControl>
                                <FormLabel>Highest education</FormLabel>
                                <Select onChange={(e)=>(setHighestEducation(e.target.value))} bg='#FFFFFF' htmlSize={84} disabled={!selectInfo} width='100%' placeholder={selectInfo ? 'Highest education' : highestEducation}>
                                    <option>Primary</option>
                                    <option>Secondary</option>
                                    <option>Higher Secondary</option>
                                    <option>Graduation</option>
                                    <option>Post Graduation</option>
                                </Select>
                            </FormControl>

                            <FormControl>
                                <FormLabel>What do you do currently?</FormLabel>
                                <Select bg='#FFFFFF' onChange={(e)=>{setCurrentJob(e.target.value)}} htmlSize={84} disabled={!selectInfo} width='100%' placeholder={selectInfo ? 'What do you do currently?' : currentJob}>
                                    <option>Schooling</option>
                                    <option>College Student</option>
                                    <option>Teaching</option>
                                    <option>Job</option>
                                    <option>Freelancing</option>
                                </Select>
                            </FormControl>

                        </Stack>
                </Box>
            </Box>

        </Box>
        
        <Box>
        <Box px={4} pb={5} bg='gray.100' borderBottom={'1px solid lightGray'}>
                <Flex h={20} alignItems={'center'} justifyContent={'space-between'}>
                    <Box>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Text my={3} fontWeight={700} align='left'>PASSWORD & SECURITY</Text>
                        </Flex>
                    </Box>
                    <Flex alignItems={'center'}>
                        <Button bg='#f3912e'>
                            Edit
                        </Button>
                    </Flex>
                </Flex>
                <Box width='100%'>
                    <Flex>
                        <Stack width='100%' direction={'row'} mb={4} spacing={10}>
                            <FormControl>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>                              
                                    <Input value={"**************"} bg='#FFFFFF' htmlSize={50} width='100%' type='Password' placeholder='Password' />
                                </InputGroup>
                            </FormControl>
                        </Stack>
                    </Flex>
                </Box>
            </Box>
        </Box>
        <Box>
        <Box px={4} bg='gray.100'>
                <Flex h={20} alignItems={'center'} justifyContent={'space-between'}>
                    <Box>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Text my={3} fontWeight={700} align='left'>INTERESTS</Text>
                        </Flex>
                    </Box>
                    <Flex alignItems={'center'}>
                        <Button bg='#f3912e'>
                            Edit
                        </Button>
                    </Flex>
                </Flex>
                <Box width='100%'>
                    <Flex>
                        <Wrap width='100%' flexWrap direction={'row'}  mb={4} spacing={10}>
                            <Badge ml='1' fontSize='0.8em' p='10px' color='#f3912e' borderRadius='5px' bg='#f2ebe6'>
                            Web Development
                            </Badge>
                            <Badge ml='1' fontSize='0.8em' p='10px' color='#f3912e' borderRadius='5px' bg='#f2ebe6'>
                            App Development
                            </Badge>
                            <Badge ml='1' fontSize='0.8em' p='10px' color='#f3912e' borderRadius='5px' bg='#f2ebe6'>
                            Machine Learning
                            </Badge>
                            <Badge ml='1' fontSize='0.8em' p='10px' color='#f3912e' borderRadius='5px' bg='#f2ebe6'>
                            Data Structures
                            </Badge>
                            <Badge ml='1' fontSize='0.8em' p='10px' color='#f3912e' borderRadius='5px' bg='#f2ebe6'>
                            Programming
                            </Badge>
                            <Badge ml='1' fontSize='0.8em' p='10px' color='#f3912e' borderRadius='5px' bg='#f2ebe6'>
                            Data Science
                            </Badge>
                        </Wrap>
                    </Flex>
                </Box>
            </Box>

        </Box>
    </Box>
  )
}

export default Profile
