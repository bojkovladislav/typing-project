import { ReloadOutlined } from '@ant-design/icons';
import { useTheme } from '../../hooks/useTheme';
import { useHover } from '../../hooks/useHover';
import { Popover } from 'antd';

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
      rootClassName="custom-restart-popover"
    >
      <ReloadOutlined
        onClick={action}
        tabIndex={tabIndex}
        onMouseEnter={hoverProps.onMouseEnter}
        onMouseLeave={hoverProps.onMouseLeave}
        style={{
          color: !isHovered ? currentTheme.text.neutral : 'white',
          transition: `0.3s all`,
        }}
      />
    </Popover>
  );
}

export default RestartButton;
