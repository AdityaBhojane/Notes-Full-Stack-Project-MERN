import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import LogIn from "./pages/login/LogIn"
import SignUp from "./pages/SignUp/SignUp"



function App() {


  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Home/>}></Route>
        <Route path="/login" element={<LogIn/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
      </Routes>
    </>
  )
}

export default App
