import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
// import Home from './components/Home'
import AllRoutes from './routes/AllRoutes'
import Navbar from './components/Navbar'
import { io } from 'socket.io-client'
import { useToast } from '@chakra-ui/react'
const Socket = io.connect("http://localhost:8080")
function App() {
  const [count, setCount] = useState(0)
  const toast = useToast()
  useEffect(() => {
    Socket.on("new message", (d:any, test:any) => {
      console.log(d, "DATA IN SOCKET", test);
      
      toast({
        title: 'Comment added.',
        description: `A new comment is added in ${test?.title}` ,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    })
  }, [])
  return (
    <div className="App">
      <Navbar/>
      <AllRoutes/>
    </div>
  )
}

export default App
