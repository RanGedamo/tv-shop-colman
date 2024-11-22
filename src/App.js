import React from 'react';
import './App.css';
import { Footer, Header } from './components/index';
import { BrowserRouter } from 'react-router-dom';
import Routing from './Routing';
import { AuthProvider } from './Contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routing />
          <Footer />
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;