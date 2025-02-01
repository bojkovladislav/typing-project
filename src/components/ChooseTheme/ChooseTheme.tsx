import { FormatPainterOutlined } from '@ant-design/icons';
import Button from '../ui/Button/Button';

interface Props {
  action: () => void;
}

function ChooseTheme({ action }: Props) {
  return (
    <Button
      text="themes"
      hoverEffect
      preventDefault
      customStyles="text-sm outline-none border-none absolute bottom-10 right-10 focus:ring-0 focus:outline-none"
      action={action}
      tabIndex={-1}
      icon={<FormatPainterOutlined />}
      iconPosition="end"
    />
  );
}

export default ChooseTheme;
