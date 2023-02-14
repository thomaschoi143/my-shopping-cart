import React from 'react';
import SearchTerm from './features/searchTerm/SearchTerm';
import Inventory from './features/inventory/Inventory';
import Cart from './features/cart/Cart';
import CurrencyFilter from './features/currencyFilter/CurrencyFilter';
import NavBar from './components/NavBar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div id="app" className="d-flex flex-column">
      <NavBar/>  
      <main className="p-4 flex-grow-1 overflow-scroll">
        <CurrencyFilter />
        <Inventory />
      </main>
      <footer className="bg-light p-4 p-xs-5 position-sticky bottom-0 w-100">
        <Cart />
      </footer>
    </div>
  );
}

export default App;
