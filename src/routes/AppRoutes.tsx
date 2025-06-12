import { Route, Routes } from 'react-router';
import App from '../App';
import Authorize from '../pages/Authorize/Authorize';
import Profile from '../pages/Profile/Profile';
import Layout from '../pages/Layout/Layout';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<App />} />
        <Route path="authorize" element={<Authorize />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
