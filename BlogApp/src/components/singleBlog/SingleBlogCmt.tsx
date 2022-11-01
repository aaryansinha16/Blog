import { Avatar, Box, HStack, Icon, IconButton, Text, useColorMode, VStack } from '@chakra-ui/react'
import React from 'react'
import { AiFillLike } from 'react-icons/ai'

const SingleBlogCmt = ({comment, user, title}: any) => {
  // console.log(comment, user, title, "COMMENT USER TITLE")
  const {colorMode} = useColorMode()

  // console.log(colorMode, 'COLOR')
  return (
    <VStack w='100%' spacing={3} mt='20px' border='1px solid gray' borderRadius='2xl' p={3}>
        <HStack w='100%' px={4} spacing={4}>
            <Avatar src='https://bit.ly/dan-abramov'/>
            <VStack spacing='none' align='left'>
                <Text fontSize='22px'>{user}</Text>
                <Text fontSize='12px'>30th Oct, 2022</Text>
            </VStack>
        </HStack>

        <Text fontSize='18px' px={5} w='100%'>{comment}</Text>

        <HStack justify='space-between' w='50%'>
          <HStack spacing={1}>
            <AiFillLike cursor='pointer'  
            color={colorMode == 'dark' ? "white": "black"}
            />
            <Text>34</Text>
          </HStack>
          <Text>Reply</Text>
        </HStack>
    </VStack>
  )
}

export default SingleBlogCmt