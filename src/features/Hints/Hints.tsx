import FilledText from '../../components/FilledText/FilledText';
import { useTheme } from '../../hooks/useTheme';

function Hints() {
  const { currentTheme } = useTheme();

  return (
    <div
      className="flex gap-2 text-[13px] justify-center items-center"
      style={{
        color: currentTheme.text.neutral,
      }}
    >
      <FilledText content="Tab" />
      <p>+</p>
      <FilledText content="Enter" />
      <p>-</p>
      <p className="text-md">restart test</p>
    </div>
  );
}

export default Hints;
