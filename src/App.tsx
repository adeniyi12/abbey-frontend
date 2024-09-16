import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./layout/MainLayout";
import Feed from "./pages/Feed";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/Profile";
import Social from "./pages/Social";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="feed" element={<Feed />} />
          <Route path="profile/user/:id" element={<Profile />} />
          <Route path="relationships/user/:id" element={<Social />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" theme="light" />
    </>
  );
}

export default App;
