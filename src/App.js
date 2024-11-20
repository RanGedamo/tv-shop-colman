import React from 'react';
import './App.css';
import { Footer, Header } from './components';

import { BrowserRouter } from 'react-router-dom';
import Routing from './Routing';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routing />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
