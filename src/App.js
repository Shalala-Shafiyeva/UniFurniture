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
import { lazy } from "react";
import AboutBannerEdit from "./dashboard/components/about page/AboutBannerEdit";
import AboutBanner from "./dashboard/components/about page/AboutBanner";
import AboutParalax from "./dashboard/components/about page/AboutParalax";
import AboutParalaxEdit from "./dashboard/components/about page/AboutParalaxEdit";
import AboutTeam from "./dashboard/components/about page/AboutTeam";
import AboutTeamTitleEdit from "./dashboard/components/about page/AboutTeamTitleEdit";
import AboutTeamMemberEdit from "./dashboard/components/about page/AboutTeamMemberEdit";
import AboutNumber from "./dashboard/components/about page/AboutNumber";
import AboutNumberTitleEdit from "./dashboard/components/about page/AboutNumberTitleEdit";
import AboutNumberSubtitleEdit from "./dashboard/components/about page/AboutNumberSubtitleEdit";
const Dashboard =lazy(() => import('./dashboard/Dashboard'));

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

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/about/banner" element={<AboutBanner />} />
        <Route path="/dashboard/about/banner/edit/:id" element={<AboutBannerEdit />} />
        <Route path="/dashboard/about/paralax" element={<AboutParalax />} />
        <Route path="/dashboard/about/paralax/edit/:id" element={<AboutParalaxEdit />} />
        <Route path="/dashboard/about/team" element={<AboutTeam />} />
        <Route path="/dashboard/about/team/title/edit/:id" element={<AboutTeamTitleEdit />} />
        <Route path="/dashboard/about/team/member/edit/:id" element={<AboutTeamMemberEdit />} />
        <Route path="/dashboard/about/number" element={<AboutNumber />} />
        <Route path="/dashboard/about/number/title/edit/:id" element={<AboutNumberTitleEdit />} />
        <Route path="/dashboard/about/number/subtitle/edit/:id" element={<AboutNumberSubtitleEdit />} />

        <Route path="/notFound" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
