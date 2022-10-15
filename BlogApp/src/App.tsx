import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
// import Home from './components/Home'
import AllRoutes from './routes/AllRoutes'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Navbar/>
      <AllRoutes/>
    </div>
  )
}

export default App
