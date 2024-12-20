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
import { Suspense } from "react";
import { lazy } from "react";
import Orders from "./pages/Orders";
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
const DashboardOrders = lazy(() =>
  import("./dashboard/components/orders page/DashboardOrders")
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

const Gallery = lazy(() => import("./dashboard/components/about page/Gallery"));
const FAQ = lazy(() => import("./dashboard/components/faqs/FAQ"));
const FAQEdit = lazy(() => import("./dashboard/components/faqs/FAQEdit"));
const Option = lazy(() => import("./dashboard/components/faqs/Option"));
const OptionEdit = lazy(() => import("./dashboard/components/faqs/OptionEdit"));
// const Article = lazy(() =>
//   import("./dashboard/components/service page/Article")
// );
// const ArticleEdit = lazy(() =>
//   import("./dashboard/components/service page/ArticleEdit")
// );
// const ArticleTitleEdit = lazy(() =>
//   import("./dashboard/components/service page/ArticleTitleEdit")
// );
const ServiceArticle = lazy(() =>
  import("./dashboard/components/service page/Article")
);
const ServiceArticleEdit = lazy(() =>
  import("./dashboard/components/service page/ArticleEdit")
);
const ServiceArticleTitleEdit = lazy(() =>
  import("./dashboard/components/service page/ArticleTitleEdit")
);
const Exellence = lazy(() =>
  import("./dashboard/components/shop page/Exellence")
);
const ExellenceEdit = lazy(() =>
  import("./dashboard/components/shop page/ExellenceEdit")
);
const PromotionSlider = lazy(() =>
  import("./dashboard/components/shop page/PromotionSlider")
);
const PromotionSliderEdit = lazy(() =>
  import("./dashboard/components/shop page/PromotionSliderEdit")
);

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
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
          <Route
            path="/cart/deliveryaddress"
            element={<CartDeliveryAddress />}
          />
          <Route path="my-orders" element={<Orders />} />

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
          <Route path="/dashboard/orders" element={<DashboardOrders />} />
          <Route path="/dashboard/about/gallery" element={<Gallery />} />
          <Route path="/dashboard/faq" element={<FAQ />} />
          <Route path="/dashboard/faq/edit/:id" element={<FAQEdit />} />
          <Route path="/dashboard/faq/options" element={<Option />} />
          <Route
            path="/dashboard/faq/option/edit/:id"
            element={<OptionEdit />}
          />
          <Route
            path="/dashboard/service/article"
            element={<ServiceArticle />}
          />
          <Route
            path="/dashboard/service/article/edit/:id"
            element={<ServiceArticleEdit />}
          />
          <Route
            path="/dashboard/service/article/title/edit/:id"
            element={<ServiceArticleTitleEdit />}
          />
          <Route path="/dashboard/shop/exellence" element={<Exellence />} />
          <Route
            path="/dashboard/shop/exellence/edit/:id"
            element={<ExellenceEdit />}
          />
          <Route
            path="/dashboard/shop/promotion-slider"
            element={<PromotionSlider />}
          />
          <Route
            path="/dashboard/shop/promotion-slider/edit/:id"
            element={<PromotionSliderEdit />}
          />
          <Route path="/dashboard/product" element={<Product />} />
          <Route path="/dashboard/product/edit/:id" element={<ProductEdit />} />
          <Route path="/dashboard/products" element={<ViewProducts />} />
          <Route path="/dashboard/product/type" element={<Type />} />
          <Route
            path="/dashboard/product/type/edit/:id"
            element={<TypeEdit />}
          />
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
      </Suspense>
    </>
  );
}

export default App;
