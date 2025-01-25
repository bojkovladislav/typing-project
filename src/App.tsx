import './App.css';
import TypingTest from './features/TypingTest/TypingTest';
import { Mode } from './types/configurationBar';
import { getLocalStorageItem } from './utils/localStorage';
import { defaultMode } from './constants';
import ConfigurationBar from './features/ConfigurationBar/ConfigurationBar';
import { useState } from 'react';
import Hints from './features/Hints/Hints';

function App() {
  const [currentMode, setCurrentMode] = useState<Mode>(
    getLocalStorageItem('currentMode') || defaultMode
  );

  return (
    <div>
      <ConfigurationBar
        currentMode={currentMode}
        setCurrentMode={setCurrentMode}
      />

      <TypingTest currentMode={currentMode} setCurrentMode={setCurrentMode} />

      <Hints />
    </div>
  );
}

export default App;
