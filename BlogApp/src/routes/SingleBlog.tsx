import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
  Input,
  Textarea,
  Toast,
  useToast,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';

import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { getSingleBlog } from '../store/api'
import { io } from 'socket.io-client';
import SingleBlogCmt from '../components/singleBlog/SingleBlogCmt';
import Sidebar from '../components/singleBlog/Sidebar';


const Socket = io.connect("http://localhost:8080")
let local = JSON.parse(`${localStorage.getItem("user")}`)
const SingleBlog = () => {

    const params = useParams()
    // console.log(params.id, "PARAMS")
    const ref:any = useRef(null)

    const [comment, setComment] = useState<any>("")

    const handleComment = () => {
      // console.log(ref.current.value)
      if(ref.current.value != null || ref.current.value != ""){
        Socket.emit("new message", {
          comment: ref.current.value,
          user: local.user.email,
          title: data.title
        })
      }
      // setComment("")
    }
    
    const [data, setData] = useState<any>({})

    const [cmt, setCmt] = useState<any>([])

    const toast = useToast()

    useEffect(() => {
      getSingleBlog(params.id).then((res) => setData(res))

      Socket.on("new message", (d:any) => {
        setCmt(d)
        console.log("server said", d)
      })
    }, [])

    // useEffect(() => {
    //   Socket.on("new message", (d:any, test:any) => {
    //     console.log(d, "DATA IN SOCKET", test);
        
    //     toast({
    //       title: 'Comment added.',
    //       description: `A new comment is added in ${test?.title}` ,
    //       status: 'success',
    //       duration: 9000,
    //       isClosable: true,
    //     })
    //   })
    // }, [])

    return (
      <Flex w='100%'>
        <SimpleGrid
          // columns={{ base: 1, lg: 2 }}
          m='auto'
          maxW={{base: '90%', lg: '4xl'}}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}>
          <Flex>
            <Box as={'header'}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                {data?.title}
              </Heading>
              <Text
                color={useColorModeValue('gray.900', 'gray.400')}
                fontWeight={300}
                fontSize={'2xl'}>
                {data?.author}
              </Text>
              <Text
                color={useColorModeValue('gray.900', 'gray.400')}
                fontWeight={300}
                fontSize={'sm'}>
                {data?.published_at}
              </Text>
            </Box>
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
          <Image
              rounded={'md'}
              alt={'product image'}
              src={data?.image}
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={{ base: '100%', sm: '400px', lg: '500px' }}
            />
  
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={'column'}
              divider={
                <StackDivider
                  borderColor={useColorModeValue('gray.200', 'gray.600')}
                />
              }>
              <VStack spacing={{ base: 4, sm: 6 }}>
                <Text
                  color={useColorModeValue('gray.500', 'gray.400')}
                  fontSize={'2xl'}
                  fontWeight={'300'}>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore
                </Text>
                <Text fontSize={'lg'}>
                  {data?.blog_content}
                </Text>
              </VStack>
              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color={useColorModeValue('yellow.500', 'yellow.300')}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'4'}>
                  Features
                </Text>
  
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  <List spacing={2}>
                    <ListItem>Chronograph</ListItem>
                    <ListItem>Master Chronometer Certified</ListItem>{' '}
                    <ListItem>Tachymeter</ListItem>
                  </List>
                  <List spacing={2}>
                    <ListItem>Anti‑magnetic</ListItem>
                    <ListItem>Chronometer</ListItem>
                    <ListItem>Small seconds</ListItem>
                  </List>
                </SimpleGrid>
              </Box>
              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color={useColorModeValue('yellow.500', 'yellow.300')}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'4'}>
                  Product Details
                </Text>
  
                <List spacing={2}>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Between lugs:
                    </Text>{' '}
                    20 mm
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Bracelet:
                    </Text>{' '}
                    leather strap
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Case:
                    </Text>{' '}
                    Steel
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Case diameter:
                    </Text>{' '}
                    42 mm
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Dial color:
                    </Text>{' '}
                    Black
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Crystal:
                    </Text>{' '}
                    Domed, scratch‑resistant sapphire crystal with anti‑reflective
                    treatment inside
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Water resistance:
                    </Text>{' '}
                    5 bar (50 metres / 167 feet){' '}
                  </ListItem>
                </List>
              </Box>
            </Stack>
  

            <Stack>
              <VStack justify='flex-start' spacing={6}>
                <Text fontSize='3xl' w='100%'>Leave a Comment</Text>
                <Textarea placeholder='Add your thoughts...' ref={ref} aria-label='comment'>

                </Textarea>
                <Box w='100%'>
                  <Button colorScheme='telegram' color='white' onClick={handleComment}>Comment</Button>
                </Box>
              </VStack>

            </Stack>
            <VStack>
              {/* {
                data?.comments.map((item:any) => {
                  console.log(data.comments, "COMMENTS")
                  if(data.title == item.title){
                    return (
                      <SingleBlogCmt {...item}/>
                    )
                  }
                })
              } */}
              {
                cmt == "" ? 
                data?.comments?.map((item:any) => {
                  console.log(data, "DATA")
                  var count = 0
                  if(data.title == item.title){
                    return (
                      <SingleBlogCmt {...item}/>
                    )
                  }
                })
                :
                cmt.map((item:any) => {
                  if(data.title == item.title){
                    return (
                      <SingleBlogCmt {...item}/>
                    )
                  }
                })
              }
            </VStack>
          </Stack>
        </SimpleGrid>
        
        <Box w='30%' m='auto' h='350vh' display={{base: 'none', lg:'block'}}>
          <Sidebar/>
        </Box>
      </Flex>
    )
}

export default SingleBlog
