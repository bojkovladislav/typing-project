import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import Profile from './pages/Profile/Profile.tsx';
import Authorize from './pages/Authorize/Authorize.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/authorize" element={<Authorize />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </ThemeProvider>
  </BrowserRouter>
);
