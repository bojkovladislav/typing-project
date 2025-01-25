import { useTheme } from '../../hooks/useTheme';

interface Props {
  content: string;
}

function FilledText({ content }: Props) {
  const theme = useTheme();

  const { secondaryColor, selectedColor } = theme.currentTheme.interface;

  return (
    <div
      className="px-2 py-1 rounded-sm text-[10px] font-semibold"
      style={{
        backgroundColor: secondaryColor,
        color: selectedColor,
      }}
    >
      {content}
    </div>
  );
}

export default FilledText;
