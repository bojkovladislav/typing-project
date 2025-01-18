import { useTheme } from '../../../hooks/useTheme';

function Spacer() {
  const { currentTheme } = useTheme();

  return (
    <div
      className="h-5 w-[5px] rounded bg-white shadow-sm"
      style={{ backgroundColor: currentTheme.interface.tertiaryColor }}
    ></div>
  );
}

export default Spacer;
