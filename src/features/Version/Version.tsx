import { useTheme } from '../../hooks/useTheme';

function Version() {
  const { currentTheme } = useTheme();

  return (
    <p
      style={{ color: currentTheme.interface.selectedColor }}
      className="text-sm"
    >{`2.0.7 (beta)`}</p>
  );
}

export default Version;
