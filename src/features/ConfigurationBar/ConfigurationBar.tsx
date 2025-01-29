import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { SetState } from '../../types/common';
import {
  Mode,
  Modes,
  NumberOfWords,
  QuoteLength,
  QuoteMode,
  SecondOptions,
  TextModes,
  TimeMode,
  WordsMode,
} from '../../types/configurationBar';
import { setLocalStorageItem } from '../../utils/localStorage';
import { defaultOptions } from './constants';
import ValueSelector from '../../components/ValueSelector/ValueSelector';
import OptionToggle from '../../components/OptionToggle/OptionToggle';
import ModeSelector from '../../components/ModeSelector/ModeSelector';
import { useTheme } from '../../hooks/useTheme';
import Spacer from '../../components/ui/Spacer/Spacer';

interface Props {
  currentMode: Mode;
  setCurrentMode: SetState<Mode>;
}

function ConfigurationBar({ currentMode, setCurrentMode }: Props) {
  const { selectedMode, additionalOptions } = currentMode;
  const { currentTheme } = useTheme();

  function getOptions() {
    return {
      ...defaultOptions,
      ...(selectedMode && { [selectedMode]: additionalOptions }),
    };
  }

  const [options, setOptions] = useState<TextModes>(getOptions);

  function changeMode(currentMode: Modes) {
    const newMode: Mode = {
      selectedMode: currentMode,
      additionalOptions: options[currentMode],
    };

    setCurrentMode(newMode);
    setLocalStorageItem('currentMode', newMode);
  }

  function changeOption<M extends Modes, V>(
    optionName: Modes,
    additionalOptionName: keyof TextModes[M],
    newValue: V
  ) {
    setCurrentMode((prevMode) => {
      const newMode = {
        ...prevMode,
        additionalOptions: {
          ...prevMode.additionalOptions,
          [additionalOptionName]: newValue,
        },
      };

      setLocalStorageItem('currentMode', newMode);

      return newMode;
    });

    setOptions((prevOptions) => ({
      ...prevOptions,
      [optionName]: {
        ...prevOptions[optionName],
        [additionalOptionName]: newValue,
      },
    }));
  }

  function renderValueSelectors<M extends Modes, T extends string | number>(
    optionsKey: keyof (typeof options)[M],
    valueToCompare: T,
    changeOptionFn: (value: T) => void
  ) {
    const items = options[selectedMode as M][optionsKey] as T[];

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ opacity: 0.8 }}
        className="flex gap-2"
      >
        {items.map((value) => (
          <ValueSelector
            key={value}
            changeOption={() => changeOptionFn(value)}
            valueToCompare={valueToCompare}
            value={value}
          />
        ))}
      </motion.div>
    );
  }

  const isVisible = useMemo(
    () => selectedMode === Modes.TIME || selectedMode === Modes.WORDS,
    [selectedMode]
  );

  return (
    <div
      className="px-5 py-3 flex rounded-md w-fit self-center"
      style={{ backgroundColor: currentTheme.interface.secondaryColor }}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="flex gap-5 mr-3 cursor-pointer"
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: isVisible ? 'auto' : 0,
              opacity: isVisible ? 1 : 0,
            }}
            exit={{
              opacity: 0,
              width: 0,
              margin: 0,
              transition: {
                opacity: {
                  duration: 0.1,
                },
              },
            }}
            transition={{
              width: {
                type: 'tween',
                ease: 'easeInOut',
                duration: 0.3,
              },
              opacity: {
                ease: 'easeInOut',
                duration: 0.5,
              },
            }}
          >
            {Object.entries(options[selectedMode])
              .filter((option) => typeof option[1] === 'boolean')
              .map(([name, value]) => (
                <OptionToggle
                  key={name}
                  name={name}
                  value={value}
                  selectedMode={selectedMode}
                  changeOption={changeOption}
                />
              ))}

            <Spacer />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-2 mr-3">
        {(Object.keys(options) as Array<keyof TextModes>).map((optionName) => {
          return (
            <ModeSelector
              key={optionName}
              optionName={optionName}
              changeMode={changeMode}
              selectedMode={selectedMode}
            />
          );
        })}
      </div>

      <div className="mr-3">
        <Spacer />
      </div>

      {selectedMode === Modes.WORDS &&
        renderValueSelectors<Modes.WORDS, NumberOfWords[number]>(
          'lengthToSelect',
          (additionalOptions as WordsMode).selectedNumberOfWords,
          (value) =>
            changeOption<Modes.WORDS, NumberOfWords[number]>(
              Modes.WORDS,
              'selectedNumberOfWords',
              value
            )
        )}

      {selectedMode === Modes.TIME &&
        renderValueSelectors<Modes.TIME, SecondOptions[number]>(
          'secondsToChooseFrom',
          (additionalOptions as TimeMode).selectedTimeLimit,
          (value) =>
            changeOption<Modes.TIME, SecondOptions[number]>(
              Modes.TIME,
              'selectedTimeLimit',
              value
            )
        )}

      {selectedMode === Modes.QUOTE &&
        renderValueSelectors<Modes.QUOTE, QuoteLength[number]>(
          'form',
          (additionalOptions as QuoteMode).selectedQuoteLength,
          (value) =>
            changeOption<Modes.QUOTE, QuoteLength[number]>(
              Modes.QUOTE,
              'selectedQuoteLength',
              value
            )
        )}
    </div>
  );
}

export default ConfigurationBar;
