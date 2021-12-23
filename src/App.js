import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { commerce } from './lib/commerce';

import { Products, Navbar, Cart, Checkout } from './components';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errMsg, setErrMsg] = useState('');

  // fetching Products
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  // fetching Cart
  const fetchCart = async () => setCart(await commerce.cart.retrieve());

  // adding items to cart
  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);
    setCart(cart);
  };

  // updating cart
  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  };

  // removing item from cart
  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  };

  // emptying the cart
  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  };

  // emptying the cart after checkout
  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );

      setOrder(incomingOrder);
      refreshCart();
    } catch (err) {
      setErrMsg(err.data.error.message);
    }
  };

  // fetchProduct and cart on render
  useEffect(() => {
    fetchProducts();
    fetchCart();

    // ! don't put fetchProducts in deb array or will infinite rerender
  }, []);
  return (
    <div>
      <Router>
        <Navbar totalItems={cart.total_items} />

        <Routes>
          <Route
            path='/'
            element={
              <Products products={products} onAddToCart={handleAddToCart} />
            }
          />

          <Route
            path='/cart'
            element={
              <Cart
                cart={cart}
                handleUpdateCartQty={handleUpdateCartQty}
                handleRemoveFromCart={handleRemoveFromCart}
                handleEmptyCart={handleEmptyCart}
              />
            }
          />

          <Route
            path='/checkout'
            element={
              <Checkout
                cart={cart}
                order={order}
                onCaptureCheckout={handleCaptureCheckout}
                error={errMsg}
                refreshCart={refreshCart}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
