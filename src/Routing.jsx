import { Route, Routes } from "react-router-dom";
import { About, Cart, ContactUs, Dashboard, Home, PageNotFound, Products } from "./components";



 function Routing() {
  return (
    <div className="main">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/about" element={<About/>} />
        <Route exact path="/ContactUs" element={<ContactUs/>} />
        <Route exact path="/Dashboard" element={<Dashboard/>} />
        <Route exact path="/Cart" element={<Cart/>} />
        <Route element={<PageNotFound/>} />
      </Routes>
    </div>
  );
}
export default Routing;