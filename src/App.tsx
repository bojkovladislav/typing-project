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

      <Modal
        open={themeModalOpen}
        handleClose={() => setThemeModalOpen(false)}
        title="Theme Selection"
        triggerButton={<ChooseTheme action={() => setThemeModalOpen(true)} />}
      >
        <ThemesSelection />
      </Modal>
    </div>
  );
}

export default App;
