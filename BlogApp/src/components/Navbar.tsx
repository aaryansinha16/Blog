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
import { getUser, loginAction } from '../store/auth/auth.actions';


export default function Navbar() {
  const [test, setTest ] = useState(0)
  const [data ,setData] = useState(null)
  let local = JSON.parse(localStorage.getItem("user"))
  
  useEffect(() => {
    console.log(local, 'this is localstorage')
    {local && getUser(local.user._id, local.token).then((res) => setData(res))}
    // loginAction()().then((res:any) => console.log(res, 'this is navbar'))
  }, [test])

  const handleLogout = () => {
    localStorage.removeItem("user")
  }

  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box as={NavLink} to='/'>Logo</Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              {data == null ?
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