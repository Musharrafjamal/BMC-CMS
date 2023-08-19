import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import AllUsers from "./pages/AllUsers";
import Employees from "./pages/Employees";
import PrivateRoute from "./PrivateRoute";
import { useState } from "react";


function App() {
  const [username, setUsername] = useState('')
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login gettingUsername={data => setUsername(data)} />} />

      {/* Private routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard email={username} />} />
        <Route path="/users" element={<AllUsers email={username} />} />
        <Route path="/employees" element={<Employees email={username} />} />
      </Route>
      </Routes>
    </>
  );
}

export default App;
