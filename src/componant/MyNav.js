import React, { ReactNode, useState, useEffect } from 'react';
import {
    IconButton,
    Box,
    CloseButton,
    Flex,
    Icon,
    useColorModeValue,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps,
    Wrap, WrapItem,
    Input, Stack,Avatar,ButtonGroup, Button, Spacer,
} from '@chakra-ui/react';
import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import CardItem from './CardItem'
import MyNavItem from './Navigation'
import { Link } from "react-router-dom";
import axios from 'axios'
import Profile from './Profile';

interface LinkItemProps {
    name: string;
    icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
    { name: 'Home', icon: FiHome },
    { name: 'Trending', icon: FiTrendingUp },
    { name: 'Explore', icon: FiCompass },
    { name: 'Favourites', icon: FiStar },
    { name: 'Settings', icon: FiSettings },
];

export default function SimpleSidebar({ children }: { children: ReactNode }) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [user, setUser] = useState({});
    const [videoList, setVideoList] = useState([]);
    console.log("curr url ==", window.location.pathname);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('userData')))
        getAllVideos();
    }, []);
    const success = (data)=>{
        console.log('success is calling', data);
        localStorage.setItem("userData", JSON.stringify(data))
        setUser(data);
    }
    const getAllVideos = async()=>{
        const data = await axios.get('https://cipherschool-backend-7j25.onrender.com/api/v1/allvideos')
        // console.log(data)
        setVideoList(data.data)
    }

    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent
                onClose={() => onClose}
                display={{ base: 'none', md: 'block' }}
            />
            <Drawer
                zIndex={1}
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} background={"white"} zIndex={0}>
                <Box h={'60px'} w="85%" bg={useColorModeValue('white', 'gray.900')} position="fixed" top={'0px'} zIndex={1} ms="-20px" >
                    <MyNavItem />
                </Box>
                {
                    window.location.pathname == '/profile' ? 
                    <Profile user={user} success = {success} />  :
                    <Wrap mt={'2%'}>
                        {
                            videoList? 
                            videoList.map((item)=>(
                            <WrapItem>
                                <Link to= {`/video/player/${item._id}`}>
                                    <CardItem video={item} />
                                </Link>
                            </WrapItem>

                            )) : ""
                        }
                    </Wrap>
                }
            </Box>
        </Box>
    );
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    return (
        <Box
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            zIndex={1}
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    Logo
                </Text>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon}>
                    {link.name}
                </NavItem>
            ))}
        </Box>
    );
};

interface NavItemProps extends FlexProps {
    icon: IconType;
    children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
    return (
        <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'cyan.400',
                    color: 'white',
                }}
                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};

interface MobileProps extends FlexProps {
    onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 24 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent="flex-start"
            {...rest}>
            <IconButton
                variant="outline"
                onClick={onOpen}
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
                Logo
            </Text>
        </Flex>
    );
};