import { Route } from 'react-router-dom/cjs/react-router-dom.min'
import home from './pages/home'
import chat from './pages/chat'
import "./App.css"

function App() {
  return (
    <div className='App'>
      <Route path='/' component={home} exact />
      <Route path='/chats' component={chat} />


    </div>
  )
}

export default App
