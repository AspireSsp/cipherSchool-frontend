import { ReactNode, useEffect, useState } from 'react';
import {
    Box,
    Flex,
    Avatar,
    HStack,
    IconButton,
    Button, ButtonGroup,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack, Input, Text,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import { Link } from "react-router-dom";
const Links = ['Dashboard', 'Projects', 'Team'];

const NavLink = ({ children }: { children: ReactNode }) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={'#'}>
        {children}
    </Link>
);

export default function WithAction() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [user, setUser] = useState({});
    
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('userData')))
    }, []);

    return (
        <>
            <Box bg={useColorModeValue('white', 'gray.900')} px={4} borderBottom={'0.5px solid #E2E8F0'}>
                <Flex h={16}  alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box></Box>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            
                            display={{ base: 'none', md: 'flex' }}>
                            <Input placeholder='Search...' />
                        </HStack>
                    </HStack>
                    {
                        user ? 
                    <Flex alignItems={'center'} me='5%'>
                        <Link to={'/'}>
                        <Button
                            variant={'solid'}
                            colorScheme={'teal'}
                            size={'sm'}
                            mr={4}
                            >
                            Home
                        </Button>
                        </Link>
                        <Button
                            variant={'solid'}
                            colorScheme={'teal'}
                            size={'sm'}
                            mr={4}
                            leftIcon={<AddIcon />}>
                            Action
                        </Button>
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                <Flex>
                                <Text me={'3%'} mt={'3%'} >
                                    {user.name}
                                </Text>
                                <Avatar
                                    size={'sm'}
                                    src={user.pic}
                                />
                                </Flex>
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Link 1</MenuItem>
                                <MenuItem>Link 2</MenuItem>
                                <MenuDivider />
                                <MenuItem>Link 3</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                    :
                    <ButtonGroup gap='2'>
                        <Link to='/signup'>
                        <Button colorScheme='teal'>Sign Up</Button>
                        </Link>
                        <Link to='/login'>
                        <Button colorScheme='teal'>Log in</Button>
                        </Link>
                    </ButtonGroup>
                    }
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            <Input placeholder='Basic usage' />
                        </Stack>
                    </Box>
                ) : null}
            </Box>

        </>
    );
}