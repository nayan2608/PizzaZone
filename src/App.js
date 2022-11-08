import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductPage from "./pages/ProductPage";
import Cart from './pages/Cart';
import SingleProduct from './pages/SinglePages';
import Navigation from './components/Navigation';
import { CartContext } from './CartContext';
import { useEffect, useState } from 'react';

function App() {

   const [ cart, setCart] = useState({});

   useEffect(() => {
      const cart = window.localStorage.getItem('cart');
      setCart(JSON.parse(cart));
   }, []);

   useEffect(() => {
      window.localStorage.setItem('cart', JSON.stringify(cart));
   }, [cart]);

  return (
      <>
        <Router>
          <CartContext.Provider value={{cart, setCart}}>
           <Navigation />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/products" element={<ProductPage />}></Route>
                <Route path="/products/:_id" element={<SingleProduct />}></Route>
                <Route path="/cart" element={<Cart />}></Route>
            </Routes>
           </CartContext.Provider>
        </Router>
      </>
  );
}

export default App;
