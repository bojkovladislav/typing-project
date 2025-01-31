import { useTheme } from '../../hooks/useTheme';
import { TextModes, WordsMode } from '../../types/configurationBar';
import { Modes } from '../../types/enums';

interface Props {
  name: string;
  value: boolean;
  selectedMode: Modes;
  changeOption: <M extends Modes, V>(
    optionName: Modes,
    additionalOptionName: keyof TextModes[M],
    newValue: V
  ) => void;
}

function OptionToggle({ name, value, selectedMode, changeOption }: Props) {
  const { currentTheme } = useTheme();

  return (
    <span
      className="cursor-pointer text-lg"
      key={name}
      onClick={() =>
        changeOption<Modes.WORDS, boolean>(
          selectedMode,
          name as keyof WordsMode,
          !value
        )
      }
      style={{
        color: value
          ? currentTheme.interface.selectedColor
          : currentTheme.interface.tertiaryColor,
      }}
    >
      {name}
    </span>
  );
}

export default OptionToggle;
