import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import ProjectAssembler from './ProjectAssembler'
import backgroundImg from '../src/assets/background2.jpg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImg})` }}>
     <ProjectAssembler />
    </div>
  )
}

export default App
