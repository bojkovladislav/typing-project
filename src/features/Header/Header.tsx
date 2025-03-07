import {
  JavaScriptOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router';

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
      <Link to="/login" className="default-clear">
        <UserOutlined className="cursor-pointer" />
      </Link>
    </div>
  );
}

export default Header;
