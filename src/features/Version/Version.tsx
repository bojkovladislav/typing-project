import { useTheme } from '../../hooks/useTheme';

function Version() {
  const { currentTheme } = useTheme();

  return (
    <p
      style={{ color: currentTheme.interface.selectedColor }}
      className="text-sm absolute left-10 bottom-10"
    >{`version 0.0.5 (beta)`}</p>
  );
}

export default Version;
