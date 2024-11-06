import Login from "./pages/Login";

function App() {
  return (
<<<<<<< HEAD
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/projects" element={<Homepage />} />
          <Route path="/projects/new" element={<CreateNewProject />} />
        </Routes>
      </BrowserRouter>
    </div>
=======
    <>
      <Login />
    </>
>>>>>>> Documentation
  );
}

export default App;
