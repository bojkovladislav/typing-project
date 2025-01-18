interface Props {
  changeOption: () => void;
  valueToCompare: string | number;
  value: string | number;
}

function ValueSelector({ changeOption, valueToCompare, value }: Props) {
  return (
    <div
      onClick={changeOption}
      className="cursor-pointer"
      style={{
        color: valueToCompare === value ? 'red' : 'green',
      }}
    >
      {value}
    </div>
  );
}

export default ValueSelector;
