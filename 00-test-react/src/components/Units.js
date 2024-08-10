import {useState} from 'react'

export default function Units() {
  const [screen, setScreen] = useState(true)

  return <div className="comp units">
    {screen && <Screen/>}
  </div>
}

function Screen() {
  return (
    <div className='unit-screen'>
      
    </div>
  )
}