import {
  JavaScriptOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router';
// import { getCookie, removeCookie } from '../../utils/cookies';

function Header() {
  // const accessToken = getCookie('google_access_token');

  // function handleAuth() {
  //   if (accessToken) {
  //     removeCookie('google_access_token');
  //   }
  // }

  const location = useLocation();

  return (
    <div className="flex justify-between">
      <div className="flex gap-10">
        <Link to="/" className="default-clear">
          <JavaScriptOutlined
            style={{ fontSize: '40px' }}
            className="cursor-pointer"
          />
        </Link>

        <SettingOutlined className="cursor-pointer" />
      </div>
      {location.pathname !== '/profile' && (
        <Link to="/authorize" className="default-clear">
          <UserOutlined className="cursor-pointer" />
        </Link>
      )}
    </div>
  );
}

export default Header;
