import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import CreateNewProject from "./components/CreateNewProject/CreateNewProject";
import LoginSignup from "./components/LoginSignup/LoginSignup";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginSignup />} />
      <Route path="/Home" element={<Homepage />} />
      <Route path="/projects/new" element={<CreateNewProject />} />
    </Routes>
  );
};

export default App;
