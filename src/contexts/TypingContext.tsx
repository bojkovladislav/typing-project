import { createContext, ReactNode, useContext, useState } from 'react';
import { TextCharacter } from '../types/typing';

interface TypingContextType {
  text: TextCharacter[];
  setText: (text: TextCharacter[]) => void;
}

const TypingContext = createContext<TypingContextType | undefined>(undefined);

export function TypingProvider({ children }: { children: ReactNode }) {
  const [text, setText] = useState<TextCharacter[]>([]);

  return (
    <TypingContext.Provider value={{ text, setText }}>
      {children}
    </TypingContext.Provider>
  );
}

export function useTypingContext() {
  const context = useContext(TypingContext);

  if (!context) {
    throw new Error('useTypingContext must be used within a TypingProvider');
  }

  return context;
}
