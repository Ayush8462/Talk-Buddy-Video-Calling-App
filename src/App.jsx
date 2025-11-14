import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import VideoCall from "./components/VideoCall"


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/room" element={<VideoCall/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
