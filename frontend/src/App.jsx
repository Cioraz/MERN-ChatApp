import { useState } from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Route } from 'react-router-dom/cjs/react-router-dom.min'
import home from './pages/home'
import chat from './pages/chat'

function App() {
  return (
    <>
      <Route path='/' component={home} exact />
      <Route path='/chats' component={chat} />


    </>
  )
}

export default App
