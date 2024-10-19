import logo from "./logo.svg";
import "./App.css";
import LoginSignup from "./Components/LoginSignup/LoginSignup";
import VideoUploadPlayer from "./Components/VideoPlayer/VideoUploadPlayer";
function App() {
  return (
    <div>
      {/* <LoginSignup/> */}
      <VideoUploadPlayer />
    </div>
  );
}

export default App;
