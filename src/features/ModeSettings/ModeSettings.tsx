import { TextModes, TimeMode, WordsMode } from '../../types/configurationBar';
import { Modes } from '../../types/enums';
import Button from '../../components/ui/Button/Button';
import { useMemo, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useInputFocus } from '../../hooks/useInputFocus';
import Input from '../../components/ui/Input/Input';

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
    : null;

  const [value, setValue] = useState<string>(selectedValue.toString());

  const formattedTime = useMemo(
    () => convertSecondsToHoursAndMinutes(value),
    [value]
  );

  function convertSecondsToHoursAndMinutes(
    inputValue: string | null | undefined
  ): string {
    const timeUnits = ['h', 'm', 's'];

    // 1h30m
    // input includes "h" || "m" || "s"
    // convert input back to seconds.

    if (Number(inputValue) !== null) {
      let currentSeconds = Number(inputValue);

      if (!inputValue || currentSeconds < 60)
        return `${inputValue || 0} seconds`;

      const secondsInHour = 3600;
      const secondsInMinute = 60;

      const hours = Math.floor(currentSeconds / secondsInHour);

      currentSeconds %= secondsInHour;

      const minutes = Math.floor(currentSeconds / secondsInMinute);

      currentSeconds %= secondsInMinute;

      const parts: string[] = [];

      if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
      if (minutes > 0)
        parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
      if (currentSeconds > 0)
        parts.push(
          `${currentSeconds} second${currentSeconds !== 1 ? 's' : ''}`
        );

      if (parts.length === 1) return parts[0];
      if (parts.length === 2) return `${parts[0]} and ${parts[1]}`;

      return `${parts[0]}, ${parts[1]} and ${parts[2]}`;
    }
  }

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
        <p style={{ color: currentTheme.text.neutral }}>{formattedTime}</p>
      )}

      {/* <NumberInput
        inputRef={inputRef}
        value={value}
        onChange={setValue}
        max={maxValue}
        min={mode === Modes.TIME ? 5 : 1}
        autoFocus
      /> */}

      <Input inputRef={inputRef} value={value} onChange={setValue} autoFocus />

      <p style={{ color: currentTheme.text.neutral }}>
        {!isWordsMode &&
          'You can use "h" for hours and "m" for minutes, for example "1h30m".'}
      </p>

      <Button text="ok" action={applyCustomValue} fill customStyles="w-full" />
    </div>
  );
}

export default ModeSettings;
