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
const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const AboutBanner = lazy(() =>
  import("./dashboard/components/about page/AboutBanner")
);
const AboutBannerEdit = lazy(() =>
  import("./dashboard/components/about page/AboutBannerEdit")
);
const AboutParalax = lazy(() =>
  import("./dashboard/components/about page/AboutParalax")
);
const AboutParalaxEdit = lazy(() =>
  import("./dashboard/components/about page/AboutParalaxEdit")
);
const AboutTeam = lazy(() =>
  import("./dashboard/components/about page/AboutTeam")
);
const AboutTeamTitleEdit = lazy(() =>
  import("./dashboard/components/about page/AboutTeamTitleEdit")
);
const AboutTeamMemberEdit = lazy(() =>
  import("./dashboard/components/about page/AboutTeamMemberEdit")
);
const AboutNumber = lazy(() =>
  import("./dashboard/components/about page/AboutNumber")
);
const AboutNumberTitleEdit = lazy(() =>
  import("./dashboard/components/about page/AboutNumberTitleEdit")
);
const AboutNumberSubtitleEdit = lazy(() =>
  import("./dashboard/components/about page/AboutNumberSubtitleEdit")
);
const Product = lazy(() => import("./dashboard/components/products/Product"));
const ProductEdit = lazy(() =>
  import("./dashboard/components/products/ProductEdit")
);
const Type = lazy(() => import("./dashboard/components/products/Type"));
const ViewProducts = lazy(() =>
  import("./dashboard/components/products/ViewProducts")
);
const TypeEdit = lazy(() => import("./dashboard/components/products/TypeEdit"));
const Category = lazy(() => import("./dashboard/components/products/Category"));
const CategoryEdit = lazy(() =>
  import("./dashboard/components/products/CategoryEdit")
);
const Color = lazy(() => import("./dashboard/components/products/Color"));
const ColorEdit = lazy(() =>
  import("./dashboard/components/products/ColorEdit")
);

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
        <Route
          path="/dashboard/about/banner/edit/:id"
          element={<AboutBannerEdit />}
        />
        <Route path="/dashboard/about/paralax" element={<AboutParalax />} />
        <Route
          path="/dashboard/about/paralax/edit/:id"
          element={<AboutParalaxEdit />}
        />
        <Route path="/dashboard/about/team" element={<AboutTeam />} />
        <Route
          path="/dashboard/about/team/title/edit/:id"
          element={<AboutTeamTitleEdit />}
        />
        <Route
          path="/dashboard/about/team/member/edit/:id"
          element={<AboutTeamMemberEdit />}
        />
        <Route path="/dashboard/about/number" element={<AboutNumber />} />
        <Route
          path="/dashboard/about/number/title/edit/:id"
          element={<AboutNumberTitleEdit />}
        />
        <Route
          path="/dashboard/about/number/subtitle/edit/:id"
          element={<AboutNumberSubtitleEdit />}
        />
        <Route path="/dashboard/product" element={<Product />} />
        <Route path="/dashboard/product/edit/:id" element={<ProductEdit />} />
        <Route path="/dashboard/products" element={<ViewProducts />} />
        <Route path="/dashboard/product/type" element={<Type />} />
        <Route path="/dashboard/product/type/edit/:id" element={<TypeEdit />} />
        <Route path="/dashboard/product/category" element={<Category />} />
        <Route
          path="/dashboard/product/category/edit/:id"
          element={<CategoryEdit />}
        />
        <Route path="/dashboard/product/color" element={<Color />} />
        <Route
          path="/dashboard/product/color/edit/:id"
          element={<ColorEdit />}
        />

        <Route path="/notFound" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
