import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {loginAction , getUser } from '../store/auth/auth.actions'
  
  export default function Login() {
    const local:any = JSON.parse(`${localStorage.getItem("user")}`)
    const navigate = useNavigate()
    const dispatch:any = useDispatch()

    const [creds, setCreds] = useState({email:"", password: ""})
    const [render, setRender] = useState<any>(false)


    const onChange = (e:any) => {
      const {name, value} = e.target
      setCreds({
        ...creds,
        [name]: value
      })
    }
    
    const [test ,setTest] = useState(0) 
    
    let getData = () => {
      return axios.get(`http://localhost:8080/users/${local.user._id}`, {
          headers : {authorization : local.token}
      })
    }

    const handleSubmit = () => {
      dispatch(loginAction(creds)).then((res:any) => {
        if(res._id.length != 0){
          navigate("/blog")
        }
        console.log(res, 'LOGINSUB')
        setRender(true)
      })
      setTest(test + 1)
    }
    
    useEffect(() => {
      // console.log(local, "LOCAL")
      if(local != null){
        getData().then((res) => setRender(true))
      }
    }, [render, test])
    
    useEffect(() => {
      console.log(render, "OUTSIDE")
    }, [])
    
    if(render){
      console.log(render, "INSIDE")
      return navigate("/blog")
    }

    

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
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
                <Input name="email" type="email" onChange={onChange} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input name="password" type="password" onChange={onChange} />
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
                  onClick={handleSubmit}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }