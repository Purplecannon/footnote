import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import Homepage from "./components/Homepage/Homepage";
import CreateNewProject from "./components/CreateNewProject/CreateNewProject";
// import VideoList from "./components/VideoList/VideoList";
// import VideoPlayback from "./components/VideoPlayback/VideoPlayback";

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route index element={<Login/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/" element={<Homepage />} />
        <Route path="/projects/new" element={<CreateNewProject />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
