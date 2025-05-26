import { Modes, TextModes } from '../../types/configurationBar';
import ConfigurationOption from '../ui/ConfigurationOption/ConfigurationOption';

interface Props {
  optionName: keyof TextModes;
  changeMode: (currentMode: Modes) => void;
  selectedMode: Modes;
}

function ModeSelector({ optionName, changeMode, selectedMode }: Props) {
  return (
    <ConfigurationOption
      action={() => changeMode(optionName as Modes)}
      content={optionName}
      selectCondition={optionName === selectedMode}
    />
  );
}

export default ModeSelector;
