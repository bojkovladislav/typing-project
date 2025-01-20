import { useState } from 'react';
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
      <div className="flex gap-2">
        {items.map((value) => (
          <ValueSelector
            key={value}
            changeOption={() => changeOptionFn(value)}
            valueToCompare={valueToCompare}
            value={value}
          />
        ))}
      </div>
    );
  }

  const isVisible = selectedMode === Modes.TIME || selectedMode === Modes.WORDS;

  return (
    <AnimatePresence>
      <motion.div
        className="px-3 py-2 grid rounded-md center-absolute top-10"
        style={{
          backgroundColor: currentTheme.interface.secondaryColor,

          gridTemplateColumns: isVisible ? '1fr 1fr 1fr' : '1fr 1fr',
        }}
        // initial={{ gridTemplateColumns: '1fr 1fr 1fr' }} // Start with 3 columns
        // animate={{
        //   gridTemplateColumns: isVisible ? '1fr 1fr 1fr' : '1fr 1fr',
        // }}
        transition={{
          gridTemplateColumns: { duration: 0.5, ease: 'easeInOut' }, // Smooth transition
        }}
        layout
      >
        {isVisible && (
          <motion.div
            className="flex gap-5 mr-5 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{
              opacity: isVisible ? 1 : 0,
            }}
            exit={{
              opacity: 0,
              transition: {
                opacity: {
                  duration: 0.1,
                },
              },
            }}
            transition={{
              opacity: {
                duration: 0.3,
                delay: 0.3,
              },
            }}
          >
            {Object.entries(options[selectedMode])
              .filter(([key, value]) => typeof value === 'boolean')
              .map(([name, value]) => (
                <OptionToggle
                  key={name}
                  name={name}
                  value={value}
                  selectedMode={selectedMode}
                  changeOption={changeOption}
                />
              ))}
          </motion.div>
        )}

        {/* <AnimatePresence>
        {isVisible && (
          <motion.div
            className="flex gap-5 mr-5 cursor-pointer"
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: isVisible ? 'auto' : 0,
              opacity: isVisible ? 1 : 0,
            }}
            exit={{
              width: 0,
              opacity: 0,
              marginRight: 0,
              transition: {
                opacity: {
                  duration: 0.1,
                },
                width: {
                  duration: 5,
                },
              },
            }}
            transition={{
              width: {
                duration: 0.5,
              },

              opacity: {
                duration: 0.3,
                delay: 0.3,
              },
            }}
          >
            {Object.entries(options[selectedMode])
              .filter(([key, value]) => typeof value === 'boolean')
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
      </AnimatePresence> */}

        <div className="flex gap-2">
          {(Object.keys(options) as Array<keyof TextModes>).map(
            (optionName) => {
              return (
                <ModeSelector
                  key={optionName}
                  optionName={optionName}
                  changeMode={changeMode}
                  selectedMode={selectedMode}
                />
              );
            }
          )}
        </div>

        {/* <Spacer /> */}

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
      </motion.div>
    </AnimatePresence>
  );
}

export default ConfigurationBar;
