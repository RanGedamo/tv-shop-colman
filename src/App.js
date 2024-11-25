import React from 'react';
import './App.css';
import { Footer, Header } from './components/index';
import { BrowserRouter } from 'react-router-dom';
import Routing from './Routing';
import { AuthProvider } from './Contexts/AuthContext';
import { CartProvider } from './Contexts/CartContext';

function App() {
  return (
    <AuthProvider>
         <CartProvider>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routing />
          <Footer />
        </BrowserRouter>
      </div>
        </CartProvider>
    </AuthProvider>
  );
}

export default App;