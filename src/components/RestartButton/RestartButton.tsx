import { ReloadOutlined } from '@ant-design/icons';
import { useTheme } from '../../hooks/useTheme';
import { useHover } from '../../hooks/useHover';
import { Popover } from 'antd';
import Button from '../ui/Button/Button';

interface RestartButtonProps {
  action: () => void;
  tabIndex: number;
}

function RestartButton({ action, tabIndex }: RestartButtonProps) {
  const { currentTheme } = useTheme();
  const { isHovered, hoverProps } = useHover();

  return (
    <Popover
      content={<p style={{ color: currentTheme.text.neutral }}>Restart Test</p>}
      placement="bottom"
      color={currentTheme.interface.secondaryColor}
      trigger={['hover', 'focus']}
      rootClassName="custom-restart-popover"
    >
      <div
        onMouseEnter={hoverProps.onMouseEnter}
        onMouseLeave={hoverProps.onMouseLeave}
      >
        <Button
          action={action}
          tabIndex={tabIndex}
          icon={
            <ReloadOutlined
              style={{
                color: !isHovered ? currentTheme.text.neutral : 'white',
                transition: `0.3s all`,
              }}
            />
          }
        />
      </div>
    </Popover>
  );
}

export default RestartButton;
