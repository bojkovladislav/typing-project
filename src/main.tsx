import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import Profile from './pages/Profile/Profile.tsx';
import Authorize from './pages/Authorize/Authorize.tsx';
import Layout from './pages/Layout/Layout.tsx';
import { TypingProvider } from './contexts/TypingContext.tsx';
import { NotificationProvider } from './contexts/NotificationContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider>
      <TypingProvider>
        <NotificationProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<App />} />
              <Route path="authorize" element={<Authorize />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </NotificationProvider>
      </TypingProvider>
    </ThemeProvider>
  </BrowserRouter>
);
