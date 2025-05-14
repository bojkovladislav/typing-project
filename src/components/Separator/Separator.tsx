import Line from '../ui/Line/Line';

function Separator() {
  return (
    <div className="flex gap-2 w-full items-center justify-center">
      <Line />

      <span className="text-lg text-center font-semibold select-none">or</span>

      <Line />
    </div>
  );
}

export default Separator;
