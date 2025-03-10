import './App.css';
import TypingTest from './features/TypingTest/TypingTest';
import { Mode } from './types/configurationBar';
import { getLocalStorageItem } from './utils/localStorage';
import { defaultMode } from './constants';
import ConfigurationBar from './features/ConfigurationBar/ConfigurationBar';
import { useState } from 'react';
import Hints from './features/Hints/Hints';
import Modal from './components/ui/Modal/Modal';
import ThemesSelection from './features/ThemesSelection/ThemesSelection';
import ChooseTheme from './components/ChooseTheme/ChooseTheme';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './features/Header/Header';
import Version from './features/Version/Version';

function App() {
  const [currentMode, setCurrentMode] = useState<Mode>(
    getLocalStorageItem('currentMode') || defaultMode
  );
  const [themeModalOpen, setThemeModalOpen] = useState(false);

  function handleModalClose() {
    setThemeModalOpen(false);
  }

  return (
    <ThemeProvider>
      <div className="flex flex-col gap-60 h-screen">
        <div className="flex flex-col gap-10">
          <Header />

          <ConfigurationBar
            currentMode={currentMode}
            setCurrentMode={setCurrentMode}
          />
        </div>

        <TypingTest currentMode={currentMode} />

        <Hints />

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
    </ThemeProvider>
  );
}

export default App;
