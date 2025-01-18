import './App.css';
import TypingTest from './features/TypingTest/TypingTest';
import ConfigurationBar from './components/ConfigurationBar/ConfigurationBar';
import { useState } from 'react';
import { Mode } from './types/configurationBar';
import { getLocalStorageItem } from './utils/localStorage';
import { defaultMode } from './constants';

function App() {
  const [currentMode, setCurrentMode] = useState<Mode>(
    getLocalStorageItem('currentMode') || defaultMode
  );

  return (
    <div className="flex gap-16 flex-col">
      <h2 className="text-gray-600">Test your typing skills!</h2>

      <ConfigurationBar
        currentMode={currentMode}
        setCurrentMode={setCurrentMode}
      />

      <TypingTest />
    </div>
  );
}

export default App;
