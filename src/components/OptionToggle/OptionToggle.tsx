import { TextModes, WordsMode } from '../../types/configurationBar';
import { Modes } from '../../types/enums';
import ConfigurationOption from '../ui/ConfigurationOption/ConfigurationOption';

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
  return (
    <ConfigurationOption
      action={() =>
        changeOption<Modes.WORDS, boolean>(
          selectedMode,
          name as keyof WordsMode,
          !value
        )
      }
      content={name}
      selectCondition={!!value}
    />
  );
}

export default OptionToggle;
