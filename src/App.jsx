import { Routes, Route} from 'react-router'
import Home from './pages/Home.jsx'
import Post from './pages/Post.jsx'
import AddPost from './pages/AddPost.jsx'
import './App.css'

function App() {
  return (
    <>
    <Routes>
      <Route index element={<Home />} />
      <Route path='/:id' element={<Post />} />
      <Route path='/add-post/' element={<AddPost />} />
    </Routes>
    </>
  )
}

export default App
