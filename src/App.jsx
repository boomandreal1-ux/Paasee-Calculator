import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Paasee } from "./components/Paasee" 
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="w-full justify-center"> <Paasee /> </div>
    </>
  )
}

export default App
