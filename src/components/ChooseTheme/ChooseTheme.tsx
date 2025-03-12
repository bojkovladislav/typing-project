import { FormatPainterOutlined } from '@ant-design/icons';
import Button from '../ui/Button/Button';
import { useTheme } from '../../hooks/useTheme';
import { IconPosition } from '../../types/enums';

interface Props {
  action: () => void;
}

function ChooseTheme({ action }: Props) {
  const { currentTheme } = useTheme();

  return (
    <Button
      text={currentTheme.name}
      hoverEffect
      preventDefault
      additionalStyles={{ color: currentTheme.interface.selectedColor }}
      customStyles="text-sm outline-none border-none absolute bottom-10 right-10 focus:ring-0 focus:outline-none"
      action={action}
      tabIndex={-1}
      icon={<FormatPainterOutlined />}
      iconPosition={IconPosition.START}
    />
  );
}

export default ChooseTheme;
