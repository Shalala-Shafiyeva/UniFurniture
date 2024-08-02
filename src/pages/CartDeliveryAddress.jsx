import Header from "../components/header/Header";
import Discover from "../components/cartDeliveryAddress/Discover";
import "../components/cartDeliveryAddress/cartDeliveryAddress.css";
import "../components/cartDeliveryAddress/cartDeliveryAddressResponsive.css";
import ShoppingCart from "../components/cartDeliveryAddress/ShoppingCart";
import TrendFurnitures from "../components/cartDeliveryAddress/TrendFurnitures";
import Footer from "../components/footer/Footer";

function CartDeliveryAddress() {
  return (
    <>
      <Header />
      <Discover />
      <ShoppingCart />
      <TrendFurnitures />
      <Footer />
    </>
  );
}

export default CartDeliveryAddress;
