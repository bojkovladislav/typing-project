import './App.css';
import TypingTest from './features/TypingTest/TypingTest';
import { Mode } from './types/configurationBar';
import { getLocalStorageItem } from './utils/localStorage';
import { defaultMode } from './constants';
import ConfigurationBar from './features/ConfigurationBar/ConfigurationBar';
import { useState } from 'react';

function App() {
  const [currentMode, setCurrentMode] = useState<Mode>(
    getLocalStorageItem('currentMode') || defaultMode
  );

  return (
    <>
      <ConfigurationBar
        currentMode={currentMode}
        setCurrentMode={setCurrentMode}
      />

      <TypingTest currentMode={currentMode} />
    </>
  );
}

export default App;
