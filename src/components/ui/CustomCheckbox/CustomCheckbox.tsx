import { InputHTMLAttributes } from 'react';
import { useTheme } from '../../../hooks/useTheme';

interface CustomCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function CustomCheckbox({ label, ...props }: CustomCheckboxProps) {
  const { currentTheme } = useTheme();

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input type="checkbox" className="peer sr-only" {...props} />

      <div
        className="w-4 h-4 mr-2 border-2 rounded-sm flex items-center justify-center transition-colors 
               peer-checked:bg-[var(--selected-color)] peer-checked:border-[var(--selected-color)]"
        style={{
          borderColor: currentTheme.interface.tertiaryColor,
          ['--selected-color' as any]: currentTheme.interface.selectedColor,
        }}
      >
        <svg
          className="w-3 h-3 text-white hidden peer-checked:block"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <span
        className="text-sm select-none"
        style={{ color: currentTheme.text.neutral }}
      >
        {label}
      </span>
    </label>
  );
}

export default CustomCheckbox;
