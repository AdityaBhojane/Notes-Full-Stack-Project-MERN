import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import LogIn from "./pages/login/LogIn";
import SignUp from "./pages/SignUp/SignUp";
import Modal from 'react-modal';

// Set the app element to the root element of your app
Modal.setAppElement('#root');

function App() {
  // Dynamically set the base path depending on the environment
  const basePath = import.meta.env.VITE_NODE_ENV === 'production' ? '/login' : '/';

  return (
    <Router basename={basePath}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
