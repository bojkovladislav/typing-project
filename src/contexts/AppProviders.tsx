import { ReactNode } from 'react';
import { ThemeProvider } from './ThemeContext';
import { TypingProvider } from './TypingContext';
import { TypingTestLockProvider } from './LockTypingTestContext';
import { NotificationProvider } from './NotificationContext';

function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <TypingProvider>
        <TypingTestLockProvider>
          <NotificationProvider>{children}</NotificationProvider>
        </TypingTestLockProvider>
      </TypingProvider>
    </ThemeProvider>
  );
}

export default AppProviders;
