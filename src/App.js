import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage';
import VendorCode from './Pages/VendorCode';
import Search from './Pages/Search';

function App() {
  
  return (
    <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/search" element={<Search />} />
  </Routes>
  );
}

export default App;
