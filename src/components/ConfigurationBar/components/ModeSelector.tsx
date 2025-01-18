import { Modes, TextModes } from '../../../types/configurationBar';

interface Props {
  optionName: keyof TextModes;
  changeMode: (currentMode: Modes) => void;
  selectedMode: Modes;
}

function ModeSelector({ optionName, changeMode, selectedMode }: Props) {
  return (
    <div className="cursor-pointer">
      <div
        onClick={() => changeMode(optionName as Modes)}
        style={{
          color: optionName === selectedMode ? 'red' : 'green',
        }}
      >
        {optionName}
      </div>
    </div>
  );
}

export default ModeSelector;
