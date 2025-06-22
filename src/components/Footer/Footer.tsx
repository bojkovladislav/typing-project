import { useState } from 'react';
import Version from '../../features/Version/Version';
import Modal from '../ui/Modal/Modal';
import ChooseTheme from '../ChooseTheme/ChooseTheme';
import ThemesSelection from '../../features/ThemesSelection/ThemesSelection';
import Hints from '../../features/Hints/Hints';
import { Link } from 'react-router';
import { GithubOutlined } from '@ant-design/icons';
import Button from '../ui/Button/Button';

function Footer() {
  const [themeModalOpen, setThemeModalOpen] = useState(false);

  function handleModalClose() {
    setThemeModalOpen(false);
  }

  return (
    <div className="flex absolute-center absolute bottom-20 w-full justify-between">
      <div className="flex gap-1 items-center justify-center">
        <Link
          to="https://github.com/bojkovladislav/typing-project"
          className="default-clear"
        >
          <Button text="github" icon={<GithubOutlined />} action={() => {}} />
        </Link>
      </div>

      <Hints />

      <div className="flex gap-1 items-center justify-center">
        <Modal
          open={themeModalOpen}
          handleClose={handleModalClose}
          title="Theme"
          triggerButton={<ChooseTheme action={() => setThemeModalOpen(true)} />}
        >
          <ThemesSelection handleModalClose={handleModalClose} />
        </Modal>

        <Version />
      </div>
    </div>
  );
}

export default Footer;
