import { TextModes, TimeMode, WordsMode } from '../../types/configurationBar';
import { Modes } from '../../types/enums';
import Button from '../../components/ui/Button/Button';
import { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import NumberInput from '../../components/ui/NumberInput/NumberInput';
import { useInputFocus } from '../../hooks/useInputFocus';

interface Props {
  mode: Modes.TIME | Modes.WORDS;
  additionalOptions: WordsMode | TimeMode;
  changeOption: <M extends Modes, V>(
    optionName: M,
    additionalOptionName: keyof TextModes[M],
    newValue: V
  ) => void;
  handleModalClose: () => void;
}

function ModeSettings({
  mode,
  additionalOptions,
  changeOption,
  handleModalClose,
}: Props) {
  const { currentTheme } = useTheme();
  const { inputRef } = useInputFocus();

  const isWordsMode = mode === Modes.WORDS;

  const selectedValue = isWordsMode
    ? (additionalOptions as WordsMode).selectedNumberOfWords
    : (additionalOptions as TimeMode).selectedTimeLimit;

  const maxValue = isWordsMode
    ? Math.max(...(additionalOptions as WordsMode).lengthToSelect)
    : Math.max(...(additionalOptions as TimeMode).secondsToChooseFrom);

  const [value, setValue] = useState<number>(selectedValue);

  const applyCustomValue = () => {
    if (isWordsMode) {
      changeOption(Modes.WORDS, 'selectedNumberOfWords', value);
    } else {
      changeOption(Modes.TIME, 'selectedTimeLimit', value);
    }

    handleModalClose();
  };

  return (
    <div className="p-4 flex flex-col gap-3">
      {!isWordsMode && (
        <p style={{ color: currentTheme.text.neutral }}>{`${value} seconds`}</p>
      )}

      <NumberInput
        inputRef={inputRef}
        value={value}
        onChange={setValue}
        max={maxValue}
        min={mode === Modes.TIME ? 5 : 1}
        autoFocus
      />

      <p style={{ color: currentTheme.text.neutral }}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
        laudantium at earum voluptate tempora excepturi consectetur, atque
        tempore saepe aliquid odio accusantium illo architecto perferendis.
        Perspiciatis architecto commodi quo. Qui.
      </p>

      <Button text="ok" action={applyCustomValue} fill customStyles="w-full" />
    </div>
  );
}

export default ModeSettings;
