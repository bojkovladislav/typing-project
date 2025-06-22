import { Outlet } from 'react-router';
import Header from '../../features/Header/Header';
import Notification from '../../components/Notification/Notification';
import { useNotification } from '../../hooks/useNotification';
import Footer from '../../components/Footer/Footer';

function Layout() {
  const { options, addNotification } = useNotification();

  return (
    <div className="flex flex-col gap-36 h-screen relative">
      {options && (
        <Notification {...options} onClose={() => addNotification(null)} />
      )}
      <Header />

      <Outlet />

      <Footer />
    </div>
  );
}

export default Layout;
