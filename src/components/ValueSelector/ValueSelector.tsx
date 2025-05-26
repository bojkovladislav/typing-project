import ConfigurationOption from '../ui/ConfigurationOption/ConfigurationOption';

interface Props {
  changeOption: () => void;
  valueToCompare: string | number;
  value: string | number;
}

function ValueSelector({ changeOption, valueToCompare, value }: Props) {
  return (
    <ConfigurationOption
      action={changeOption}
      content={value}
      selectCondition={valueToCompare === value}
    />
  );
}

export default ValueSelector;
