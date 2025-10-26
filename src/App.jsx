import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Form from './components/Form';
import History from './pages/History';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/form' element={<Form />} />
        <Route path='/history' element={<History />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;