import { FormatPainterOutlined } from '@ant-design/icons';
import Button from '../ui/Button/Button';

interface Props {
  action: () => void;
}

function ChooseTheme({ action }: Props) {
  return (
    <Button
      text="themes"
      customStyles="text-sm outline-none border-none absolute bottom-10 right-10"
      action={action}
      tabIndex={2}
      icon={<FormatPainterOutlined />}
      iconPosition="end"
    />
  );
}

export default ChooseTheme;
