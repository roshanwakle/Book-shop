import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { Navbar } from './components/navbar/navbar';
import { Footer } from "./components/footer/footer";
import { About } from "./components/aboutUs/about";
import { Home } from "./components/home/home";
import { SearchBar } from "./components/searchBar/searchBar";
import { SignUp } from "./components/signUp/signUp";
import { SignIn } from "./components/signIn/SignIn";
import { Cart } from "./components/cards/cart";
import { CartProvider } from "react-use-cart";
import { useState } from "react";
import { Admin } from "./components/admin/admin"
import { AddProduct } from "./components/admin/addProduct";
import { EditProduct } from "./components/admin/editProduct";
import axios from "axios";
import { useEffect } from "react";
import { Cards } from "./components/cards/cards";
import { PrivateComponent } from "./components/privateComponent";
import { BuyNow } from "./components/cards/BuyNow";
import { AdminUser } from "./components/admin/adminUser";
import { ForgotPassword } from "./components/signIn/ForgotPassword";
import { PasswordReset } from "./components/signIn/ResetPasword";
import swal from 'sweetalert';

function App(props) {
  const [cards, setCards] = useState([]);
  const [cartItems, setCartItems] = useState([])
  const getProducts = async (e) => {

    const response = await axios.get(`http://localhost:5000/product/getProduct`)
    if (response.status === 200) {
      setCards(response.data.products)
    }
  }

  const handleAddProduct = (product) => {
    const productExist = cartItems.find((item) => item.productId === product.productId);
    // swal({
    //   title: "Success!",
    //   text: "Product added in cart",
    //   icon: "success",
    //   button: "OK!",
    // });
    if (productExist) {
      setCartItems(cartItems.map((item) => item.productId === product.productId ?
        { ...productExist, quantity: productExist.quantity + 1 } : item))
    } else {
      
      setCartItems([...cartItems, { ...product, quantity: 1 }])


    }
  }


  const handleRemoveProducts = (product) => {
    const productExist = cartItems.find((item) => item.productId === product.productId);
    if (productExist === 1) {
      setCartItems(cartItems.filter((item) => item.productId === product.productId))
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.productId === product.productId ? { ...productExist, quantity: productExist.quantity - 1 } : item
        )
      )
    }
  }

  const handleCartClearane = () => {
    setCartItems([])
  }

  useEffect(() => {

  }, [])
  const auth = localStorage.getItem("token")

  return (
    <div className="page-container">

      <div className='content-wrap'>
        <div>
        </div>

        <BrowserRouter >
          <Navbar cartItems={cartItems} />
          <Routes >
            <Route element={<PrivateComponent/>}>
            <Route path="/Home" exact element={<Home handleAddProduct={handleAddProduct} />} />
            <Route path="/About" exact element={<About />} />
            <Route path="/Cart" exact element={<Cart cartItems={cartItems} handleAddProduct={handleAddProduct} handleRemoveProducts={handleRemoveProducts} handleCartClearane={handleCartClearane} />} />
            <Route path="/Admin" exact element={<Admin/>} />
            <Route path="/AddProduct" exact element={<AddProduct />} />
            <Route path="/editProduct/:id" exact element={<EditProduct />} />
            <Route path="/BuyNow" exact element={<BuyNow />} />
            <Route path="/AdminUser" exact element={<AdminUser />} />
           
            
            </Route>
            <Route path="/ForgotPassword/:id/:token" exact element={<ForgotPassword />} />
            <Route path="/PasswordReset" exact element={<PasswordReset />} />
            <Route path="/SignUp" exact element={<SignUp />} />
            <Route path="/SignIn" exact element={<SignIn />} />
          </Routes>
        </BrowserRouter>
      </div>
        <Footer />
    </div>
  );
}

export default App;
