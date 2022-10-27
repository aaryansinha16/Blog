import { ReactNode, useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { getUser, loginAction, logoutAction } from '../store/auth/auth.actions';
import LightLogo from './Logo/LightLogo/LightLogo';
import DarkLogo from './Logo/DarkLogo/DarkLogo';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';


export default function Navbar() {
  const [test, setTest ] = useState(0)
  const [data ,setData] = useState(null)
  let local:any = JSON.parse(`${localStorage.getItem("user")}`) || null
  const dispatch:any = useDispatch()
  
  
  const handleLogout = () => {
    dispatch(logoutAction(local.token))
    // localStorage.removeItem("user")
    setTest((prev) => prev + 1)
  }

  useEffect(() => {
    if(local != null){
      console.log(local, "NAVLOCAL")
      getData().then((res:any) => setData(res))
    }
  }, [test])

  let getData = () => {
    return axios.get(`http://localhost:8080/users/${local.user._id}`, {
        headers : {authorization : local.token}
    })
  }


  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} py={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box w='14%' as={NavLink} to='/'>
            {
              colorMode == 'dark' ? <LightLogo/> : <DarkLogo/>
            }
          </Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button as={NavLink} to='/blog' >Blog</Button>
              { data == null ?
              <>
                <Button as={NavLink} to='/login' >Login</Button>
                <Button as={NavLink} to='/signup'>SignUp</Button>
              </>
              :
              <>
                <Button onClick={() => {
                  handleLogout()
                  setTest(test + 1)
                  }}>Logout</Button>
              </>
              }
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}