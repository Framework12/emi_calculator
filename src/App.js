import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/Theme';
import { CssBaseline } from '@mui/material';
import { Navbar } from './components/Navbar';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import About from './pages/About';
import { ExchangeRates } from './pages/ExchangeRates';

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exchange" element={<ExchangeRates />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;