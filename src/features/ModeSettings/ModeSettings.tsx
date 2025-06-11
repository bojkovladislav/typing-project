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
  ) {
    const infinity = 'Infinity';
    const timeUnits = ['h', 'm', 's'] as const;
    let currentSeconds: number = 0;
    const result = {
      seconds: currentSeconds,
      formattedTime: infinity,
    };

    if (!inputValue) return result;

    const groups = inputValue.match(/\d+[a-zA-Z]?/g) || [];

    const secondsInHour = 3600;
    const secondsInMinute = 60;

    const unitToSeconds = {
      h: (hours: number) => hours * secondsInHour,
      m: (minutes: number) => minutes * secondsInMinute,
      s: (seconds: number) => seconds,
    };

    for (const group of groups) {
      const groupAsNumber = Number(group);

      if (!isNaN(groupAsNumber)) {
        currentSeconds += groupAsNumber;

        continue;
      }

      const currentUnit = group[group.length - 1];
      const value = parseInt(group);

      if (timeUnits.some((unit) => unit === currentUnit)) {
        const secondsFromUnit =
          unitToSeconds[currentUnit as (typeof timeUnits)[number]](value);

        currentSeconds += secondsFromUnit;
      } else {
        currentSeconds += value;
      }
    }

    result.seconds = currentSeconds;

    const hours = Math.floor(currentSeconds / secondsInHour);

    currentSeconds %= secondsInHour;

    const minutes = Math.floor(currentSeconds / secondsInMinute);

    currentSeconds %= secondsInMinute;

    const parts: string[] = [];

    if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
    if (minutes > 0) parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
    if (currentSeconds > 0)
      parts.push(`${currentSeconds} second${currentSeconds !== 1 ? 's' : ''}`);

    if (parts.length === 1) {
      result.formattedTime = parts[0];
    } else if (parts.length === 2) {
      result.formattedTime = `${parts[0]} and ${parts[1]}`;
    } else {
      result.formattedTime = `${parts[0]}, ${parts[1]} and ${parts[2]}`;
    }

    return result;
  }

  const applyCustomValue = () => {
    if (isWordsMode) {
      changeOption(Modes.WORDS, 'selectedNumberOfWords', value);
    } else {
      changeOption(Modes.TIME, 'selectedTimeLimit', formattedTime.seconds);
    }

    handleModalClose();
  };

  return (
    <div className="p-4 flex flex-col gap-3">
      {!isWordsMode && (
        <p style={{ color: currentTheme.text.neutral }}>
          {formattedTime.formattedTime}
        </p>
      )}

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
