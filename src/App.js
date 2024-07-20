import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import About from "./pages/About";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/login' element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About/>}/>
        <Route path="*" element={<NotFound/>} />
      </Routes>
      {/* <Header/>
      <Footer /> */}
    </>
  );
}

export default App;
