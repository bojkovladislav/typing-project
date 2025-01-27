import './App.css';
import TypingTest from './features/TypingTest/TypingTest';
import { Mode } from './types/configurationBar';
import { getLocalStorageItem } from './utils/localStorage';
import { defaultMode } from './constants';
import ConfigurationBar from './features/ConfigurationBar/ConfigurationBar';
import { useState } from 'react';
import Hints from './features/Hints/Hints';
import ChooseTheme from './components/ChooseTheme/ChooseTheme';
import Modal from './components/ui/Modal/Modal';
import ThemesSelection from './features/ThemesSelection/ThemesSelection';

function App() {
  const [currentMode, setCurrentMode] = useState<Mode>(
    getLocalStorageItem('currentMode') || defaultMode
  );
  const [themeModalOpen, setThemeModalOpen] = useState(false);

  return (
    <div>
      <ConfigurationBar
        currentMode={currentMode}
        setCurrentMode={setCurrentMode}
      />

      <TypingTest currentMode={currentMode} setCurrentMode={setCurrentMode} />

      <Hints />

      <ChooseTheme />

      <Modal
        open={themeModalOpen}
        handleClose={() => setThemeModalOpen(false)}
        handleOpen={() => setThemeModalOpen(true)}
        title="Theme Selection"
      >
        <ThemesSelection />
      </Modal>
    </div>
  );
}

export default App;
