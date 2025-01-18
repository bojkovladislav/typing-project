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
  return (
    <div
      className="cursor-pointer"
      key={name}
      onClick={() =>
        changeOption<Modes.WORDS, boolean>(
          selectedMode,
          name as keyof WordsMode,
          !value
        )
      }
      style={{
        color: value ? 'red' : 'white',
      }}
    >
      {name}
    </div>
  );
}

export default OptionToggle;
