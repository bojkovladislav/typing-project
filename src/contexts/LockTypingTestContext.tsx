import {
  createContext,
  MutableRefObject,
  ReactNode,
  useContext,
  useMemo,
  useRef,
} from 'react';

interface TypingTestLockContextType {
  isTypingTestLocked: MutableRefObject<boolean>;
  isTypingTestLockedFromOutside: MutableRefObject<boolean>;
  lockTypingTest: () => void;
  unlockTypingTest: () => void;
  lockTypingTestFromOutside: () => void;
  unlockTypingTestFromOutside: () => void;
}

const TypingTestLockContext = createContext<
  TypingTestLockContextType | undefined
>(undefined);

export function TypingTestLockProvider({ children }: { children: ReactNode }) {
  const isTypingTestLocked = useRef(false);
  const isTypingTestLockedFromOutside = useRef(false);

  const lockTypingTestFromOutside = () => {
    isTypingTestLockedFromOutside.current = true;
  };

  const unlockTypingTestFromOutside = () => {
    isTypingTestLockedFromOutside.current = false;
  };

  const lockTypingTest = () => {
    isTypingTestLocked.current = true;
  };

  const unlockTypingTest = () => {
    isTypingTestLocked.current = false;
  };

  const value = useMemo(
    () => ({
      isTypingTestLocked,
      isTypingTestLockedFromOutside,
      lockTypingTest,
      unlockTypingTest,
      lockTypingTestFromOutside,
      unlockTypingTestFromOutside,
    }),
    []
  );

  return (
    <TypingTestLockContext.Provider value={value}>
      {children}
    </TypingTestLockContext.Provider>
  );
}

export function useTypingTestLock(): TypingTestLockContextType {
  const context = useContext(TypingTestLockContext);

  if (!context) {
    throw new Error(
      'useTypingTestLock must be used within a TypingTestLockProvider'
    );
  }

  return context;
}
