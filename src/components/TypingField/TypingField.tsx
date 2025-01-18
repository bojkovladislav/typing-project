import { TextCharacter } from '../../types/typing';
import Cursor from '../ui/Cursor/Cursor';

interface TypingFieldProps {
  text: TextCharacter[];
  currentLetterIndex: number;
}

function TypingField({ text, currentLetterIndex }: TypingFieldProps) {
  return (
    <div>
      {text.map((letter, i) => (
        <span
          key={i}
          className="relative"
          style={{ color: letter.currentColor }}
        >
          {i === currentLetterIndex && <Cursor />}
          {letter.value}
        </span>
      ))}
    </div>
  );
}

export default TypingField;
