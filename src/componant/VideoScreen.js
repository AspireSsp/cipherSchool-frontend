import {
  Box,
  Flex,
  Text,
  Player,
  GrVolume,
  GiExitDoor,
  IconButton,
  Spacer,
  Button,
  Heading,
  CardFooter,
  Stack,
  StackDivider,
  CardHeader,
  Avatar,
  useColorModeValue,
  Input, CardBody, Image, Card, VStack,
} from "@chakra-ui/react";
import { BiLike, BiChat, BiShare, BiDotsVerticalRounded } from "react-icons/bi";
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import Navigation from "./Navigation";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const VideoScreen = () => {

  const { id } = useParams();

  const [videoData, setVideoData] = useState({});
  const [suggestedVidList, setSuggestedVidList] = useState([]);
  const [like, setLike] = useState(false)
  const [user, setUser] = useState('')
  const [myComment, setMyComment] = useState('')
  const [update, setUpdate] = useState(false)
  
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('userData')))
    getMyvidio();
    getSuggestedVideo();
  }, [id,like, update]);

  const getSuggestedVideo = async () => {
    const suggVid = await axios.get('https://cipherschool-backend-7j25.onrender.com/api/v1/allvideos')
    // console.log(suggVid)
    setSuggestedVidList(suggVid.data)
  }
  const getMyvidio = async () => {
    const videoData = await axios.get(`https://cipherschool-backend-7j25.onrender.com/api/v1/getVideoById/${id}`)
    setLike(videoData.data.isLiked.includes(user._id));
    setVideoData(videoData.data);
  }

  const addLike = async()=>{
    // console.log('add call')
    const res = await axios.put(`https://cipherschool-backend-7j25.onrender.com/api/v1/addlike?videoId=${videoData._id}&userId=${user._id}`)
    // console.log(res);
    if(res.status==200){
      setLike(true);
    }
  }

  const removeLike = async()=>{
    // console.log('remove call')
    const res = await axios.put(`https://cipherschool-backend-7j25.onrender.com/api/v1/removelike?videoId=${videoData._id}&userId=${user._id}`)
    if(res.status==200){
      setLike(false);
    }
  }
  
  const addComment = async()=>{
    const body = {
      videoId: videoData._id,
      userId: user._id,
      userName: user.name ,
      message : myComment,
    }
    // console.log(body);
    const res = await axios.post('https://cipherschool-backend-7j25.onrender.com/api/v1/addcomment',body )
    // console.log(res);
    if(res.status == 200){
      setUpdate(true);
      setMyComment('')
    }
  }

  return (
    <div>
      <Box bg={useColorModeValue('white', 'gray.900')}>
        <Navigation />
        <Box m={"1%"}>
          <Flex color="white" mx={"2%"}>
            <Box flex="2">
              <Box pos="relative" w="100%" ms={"2%"}>
                <ReactPlayer
                  controls
                  width={"94%"}
                  height={"68vh"}
                  url={videoData?.video ? videoData?.video : "/"}
                />
              </Box>
              <Box>
                <Box mt={"1%"} ms={"2%"} mb={"1%"}>
                  <Heading
                    as="h4"
                    size="md"
                    color={"black"}
                    fontFamily={"revert"}
                    fontWeight={"medium"}
                  >
                    {videoData?.title ? videoData?.title : "name"}
                  </Heading>
                </Box>
                <Box ms={"1%"} color={"black"} borderBottom={"1px solid gray"}>
                  <Flex>
                    <Box p="4">
                      <Flex spacing="4">
                        <Flex
                          flex="1"
                          gap="4"
                          alignItems="center"
                          flexWrap="wrap"
                        >
                          <Avatar
                            name={videoData?.name ? videoData?.name : "name"}
                            src=""
                          />

                          <Box>
                            <Heading size="sm">{videoData?.name ? videoData?.name : ""}</Heading>
                            <Text>Full stack, Developer</Text>
                          </Box>
                        </Flex>
                      </Flex>
                    </Box>
                    <Spacer />
                    <Box p="4" me={"2%"}>
                      <Button flex={1} variant={"ghost"} leftIcon={<BiLike />} color={like ? "#2B6CB0": "black"} onClick={like ? removeLike : addLike }>
                        Like {videoData?.isLiked ? videoData?.isLiked?.length : "0"}
                      </Button>
                      <Button flex={1} variant={"ghost"} leftIcon={<BiChat />}>
                        Comment {videoData?.isComment ? videoData?.isComment?.length : "0"}
                      </Button>
                      <Button flex={1} variant={"ghost"} leftIcon={<BiShare />}>
                        Share
                      </Button>
                    </Box>
                  </Flex>
                </Box>
              </Box>
              <Box ms={"2%"} color={"black"}>
                <Text>comments</Text>
                <Flex minWidth="max-content" alignItems="center" gap="2">
                  <Box p="2" w={"90%"}>
                    <Input
                      borderBottom={"1px solid gray"}
                      placeholder="add your comment"
                      onChange={(e)=>{setMyComment(e.target.value)}}
                      value={myComment}
                    />
                  </Box>
                  <Button colorScheme="teal" me={"2%"} onClick={addComment}>
                    comment
                  </Button>
                </Flex>
                <Box>
                  <Stack divider={<StackDivider />} spacing="4">
                    {
                      videoData?.isComment ? videoData?.isComment?.map((item) => (
                        <Box>
                          <Flex>
                            <Box m={"1%"}>
                              <Avatar
                                name={item.userName}
                                src=""
                              />
                            </Box>
                            <Box m={"1%"}>
                              <Heading size="xs" textTransform="uppercase">
                                {item.userName}
                              </Heading>
                              <Text pt="2" fontSize="sm">
                                {item.message}
                              </Text>
                            </Box>
                          </Flex>
                        </Box>
                      )) : ""
                    }


                  </Stack>
                </Box>
              </Box>
            </Box>
            <Box flex="1">
              {
                suggestedVidList ? suggestedVidList.map((item) => (
                  <Link to={`/video/player/${item._id}`}>
                    <Box mb={'1%'} h={"110px"}>
                      <Flex border={'0.5px solid #CBD5E0'} w={'100%'} h={'100%'} borderRadius={'4px'}>
                        <Box w={'45%'} h={"108px"} background={'lightblue'} overflow="hidden">
                          <Image src={item?.thombnail ? item?.thombnail : ''} alt='Dan Abramov' />
                        </Box>
                        <Box w={'55%'} color={'black'} m={'2%'}>
                          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                            <Text fontWeight={600}>{item.title ? item.title : ""}</Text>
                            <Text color={'gray.500'}>{item.userName ? item.userName : ""}</Text>
                            <Flex>
                              <Text color={'gray.500'} w={'60%'}>{item?.time ? new Date(item.time).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, ' ') : ""}</Text>
                              <Text color={'gray.500'} w={'40%'}>{item?.views ? item?.views : "0"}{" "} views</Text>
                            </Flex>
                          </Stack>
                        </Box>
                      </Flex>
                    </Box>
                  </Link>
                )) : ""
              }

            </Box>
          </Flex>
        </Box>
      </Box>
    </div>
  );
};

export default VideoScreen;
