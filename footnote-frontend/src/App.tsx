import { BrowserRouter, Routes, Route } from "react-router-dom";
// import LoginSignup from "./components/LoginSignup/LoginSignup";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
// import VideoList from "./components/VideoList/VideoList";
// import VideoPlayback from "./components/VideoPlayback/VideoPlayback";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route index element={<Login/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
