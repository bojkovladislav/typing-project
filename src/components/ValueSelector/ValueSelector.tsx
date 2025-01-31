import { useTheme } from '../../hooks/useTheme';

interface Props {
  changeOption: () => void;
  valueToCompare: string | number;
  value: string | number;
}

function ValueSelector({ changeOption, valueToCompare, value }: Props) {
  const { currentTheme } = useTheme();

  return (
    <div
      onClick={changeOption}
      className="cursor-pointer text-lg"
      style={{
        color:
          valueToCompare === value
            ? currentTheme.interface.selectedColor
            : currentTheme.interface.tertiaryColor,
      }}
    >
      {value}
    </div>
  );
}

export default ValueSelector;
