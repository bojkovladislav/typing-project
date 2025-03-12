import { useTheme } from '../../../hooks/useTheme';

function Line() {
  const { currentTheme } = useTheme();

  return (
    <div
      className="h-1 rounded-lg w-full"
      style={{ backgroundColor: currentTheme.interface.secondaryColor }}
    />
  );
}

export default Line;
