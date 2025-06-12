import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './index.css';
import AppProviders from './contexts/AppProviders.tsx';
import AppRoutes from './routes/AppRoutes.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  </BrowserRouter>
);
