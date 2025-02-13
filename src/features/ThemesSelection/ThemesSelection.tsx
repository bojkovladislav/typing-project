import { List as AntdList } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useTheme } from '../../hooks/useTheme';
import { THEMES } from '../../constants';

interface Props {
  handleModalClose: () => void;
}

function ThemesSelection({ handleModalClose }: Props) {
  const { changeTheme } = useTheme();

  function handleThemeSwitch(newTheme: (typeof THEMES)[number]) {
    changeTheme(newTheme);
    handleModalClose();
  }

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
        next={() => {}}
        hasMore={THEMES.length < 50}
        loader=""
      >
        <AntdList
          dataSource={THEMES}
          renderItem={(item) => (
            <AntdList.Item
              key={item.name}
              onClick={() => handleThemeSwitch(item)}
            >
              <AntdList.Item.Meta title={<p>{item.name}</p>} />
              <div
                className="p-3 rounded-md flex gap-2"
                style={{
                  backgroundColor: item.interface.primaryColor,
                }}
              >
                {Object.keys(item.interface)
                  .slice(1)
                  .map((colorName) => {
                    return (
                      <div
                        key={colorName}
                        className="rounded-full"
                        style={{
                          backgroundColor:
                            item.interface[
                              colorName as keyof typeof item.interface
                            ],
                          width: '10px',
                          height: '10px',
                        }}
                      />
                    );
                  })}
              </div>
            </AntdList.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
}

export default ThemesSelection;
