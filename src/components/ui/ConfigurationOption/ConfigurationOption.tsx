import { useTheme } from '../../../hooks/useTheme';

interface Props {
  action: () => void;
  content: string | number;
  selectCondition: boolean;
}

function ConfigurationOption({ action, content, selectCondition }: Props) {
  const { currentTheme } = useTheme();

  return (
    <button
      className="hover:underline m-0 p-0 border-none bg-transparent cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 transition-colors"
      style={{
        color: selectCondition
          ? currentTheme.interface.selectedColor
          : currentTheme.interface.tertiaryColor,
      }}
      onMouseDown={(e) => {
        e.preventDefault();

        action();
      }}
    >
      {content}
    </button>
  );
}

export default ConfigurationOption;
