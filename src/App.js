import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
// import Header from "./components/header/Header";
// import Footer from "./components/footer/Footer";
import About from "./pages/About";
import Home from "./pages/Home";
import Shopping from "./pages/Shopping";
import ProductDetails from "./pages/ProductDetails";
import MoreProducts from "./pages/MoreProducts";
import CartDeliveryAddress from "./pages/CartDeliveryAddress";
import Services from "./pages/Services";
import Blog from "./pages/Blog";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shopping />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/product/:type/:id" element={<ProductDetails />} />
        <Route path="/shop/moreFurnitures" element={<MoreProducts />} />
        <Route path="/cart/deliveryaddress" element={<CartDeliveryAddress />} />
        <Route path="/notFound" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
