import { Flex, Image } from '@chakra-ui/react'
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';

export default function BlogPostWithImage(props) {
  // console.log("propppp", props.video)
  return (
    <Center py={6} m="2">
      <Box
        maxW={'289px'}
        h={'350px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
        <Box
          h={'195px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}>
          <Image
            src={
              props?.video?.thombnail ? props?.video?.thombnail :""
            }
            layout={'fill'}
          />
        </Box>
        
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          <Avatar
            src={props?.video?.userPic ? props?.video?.userPic : 'https://avatars0.githubusercontent.com/u/1164541?v=4'}
            alt={'Author'}
          />
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>{props?.video?.title ? props?.video?.title : "no title"}</Text>
            <Text color={'gray.500'}>{props?.video?.userName ? props?.video?.userName : "user"}</Text>
            <Flex>
            <Text color={'gray.500'} w={'60%'}>{props?.video?.time ? new Date(props?.video?.time).toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'}).replace(/ /g, ' '): ""}</Text>
            <Text color={'gray.500'} w={'40%'}>{props?.video?.views ? props?.video?.views : "0" }{" "} views</Text>
            </Flex>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}