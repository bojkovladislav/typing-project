import { useTheme } from '../../hooks/useTheme';
import { Modes, TextModes } from '../../types/configurationBar';

interface Props {
  optionName: keyof TextModes;
  changeMode: (currentMode: Modes) => void;
  selectedMode: Modes;
}

function ModeSelector({ optionName, changeMode, selectedMode }: Props) {
  const { currentTheme } = useTheme();

  return (
    <div className="cursor-pointer text-sm">
      <div
        onClick={() => changeMode(optionName as Modes)}
        style={{
          color:
            optionName === selectedMode
              ? currentTheme.interface.selectedColor
              : currentTheme.interface.tertiaryColor,
        }}
      >
        {optionName}
      </div>
    </div>
  );
}

export default ModeSelector;
