import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LowerHalf from './components/lowerHalf'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <LowerHalf/>
    </>
  )
}

export default App
