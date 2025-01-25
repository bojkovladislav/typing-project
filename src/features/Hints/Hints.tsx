import FilledText from '../../components/FilledText/FilledText';

function Hints() {
  return (
    <div className="bottom-10 center-absolute">
      <div className="flex gap-2 text-[13px] justify-center items-center">
        <FilledText content="Tab" />
        <p>+</p>
        <FilledText content="Enter" />
        <p>-</p>
        <p>restart test</p>
      </div>
    </div>
  );
}

export default Hints;
