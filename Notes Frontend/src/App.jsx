import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import LogIn from "./pages/login/LogIn"
import SignUp from "./pages/SignUp/SignUp"
import Modal from 'react-modal';
// Set the app element to the root element of your app
Modal.setAppElement('#root');



function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<LogIn/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
      </Routes>
    </>
  )
}

export default App
