import { useContext, useState } from 'react';
import { Outlet } from 'react-router';
import Hints from '../../features/Hints/Hints';
import Modal from '../../components/ui/Modal/Modal';
import ChooseTheme from '../../components/ChooseTheme/ChooseTheme';
import ThemesSelection from '../../features/ThemesSelection/ThemesSelection';
import Version from '../../features/Version/Version';
import Header from '../../features/Header/Header';
import Notification from '../../components/Notification/Notification';
import {
  NotificationContext,
  NotificationContextType,
} from '../../contexts/NotificationContext';

function Layout() {
  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const { options, add } = useContext(
    NotificationContext
  ) as NotificationContextType;

  function handleModalClose() {
    setThemeModalOpen(false);
  }

  return (
    <div className="flex flex-col gap-36 h-screen">
      {options && <Notification {...options} onClose={() => add(null)} />}
      <Header />
      <Hints />

      <Modal
        open={themeModalOpen}
        handleClose={handleModalClose}
        title="Theme"
        triggerButton={<ChooseTheme action={() => setThemeModalOpen(true)} />}
      >
        <ThemesSelection handleModalClose={handleModalClose} />
      </Modal>

      <Outlet />

      <Version />
    </div>
  );
}

export default Layout;
