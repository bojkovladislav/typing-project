import { Avatar, Divider, List as AntdList, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useTheme } from '../../hooks/useTheme';
import { THEMES } from '../../constants';

interface Props {}

function ThemesSelection() {
  const theme = useTheme();

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <InfiniteScroll
        dataLength={THEMES.length}
        scrollableTarget="scrollableDiv"
      >
        <AntdList
          dataSource={THEMES}
          renderItem={(item) => (
            <AntdList.Item key={item.name}>
              <AntdList.Item.Meta title={<p>{item.name}</p>} />
              <div
                className="p-3 rounded-md "
                style={{
                  backgroundColor: theme.currentTheme.interface.primaryColor,
                }}
              ></div>
            </AntdList.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
}

export default ThemesSelection;
