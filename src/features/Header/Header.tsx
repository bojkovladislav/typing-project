import {
  JavaScriptOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';

function Header() {
  return (
    <div className="flex justify-between">
      <div className="flex gap-10 ">
        <JavaScriptOutlined
          style={{ fontSize: '40px' }}
          className="cursor-pointer"
        />

        <SettingOutlined className="cursor-pointer" />
      </div>
      <div>
        <UserOutlined className="cursor-pointer" />
      </div>
    </div>
  );
}

export default Header;
