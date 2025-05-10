import {
  GithubOutlined,
  GoogleOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import FormTitle from '../../components/ui/FormTitle/FormTitle';
import BaseForm from '../../components/ui/BaseForm/BaseForm';
import AuthOption from '../../components/AuthOption/AuthOption';
import Separator from '../../components/Separator/Separator';
import { Link, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { getUrlParts, setCookie } from '../../utils/cookies';
import { loginSchema, LoginSchema } from '../../validations/LoginSchema';
import { login } from '../../api/auth';
import { useNotification } from '../../hooks/useNotification';

function Login() {
  const { handleAuthNotifications } = useNotification();

  const navigate = useNavigate();

  async function onSubmit(values: LoginSchema) {
    const response = await login(values);

    handleAuthNotifications(response);
  }

  useEffect(() => {
    const googleAccessToken = getUrlParts()['google_access_token'];
    const githubAccessToken = getUrlParts()['github_access_token'];

    console.log(googleAccessToken, githubAccessToken);

    if (!githubAccessToken && !googleAccessToken) return;

    if (googleAccessToken) {
      setCookie('google_access_token', googleAccessToken, 1);
    }

    if (githubAccessToken) {
      setCookie('github_access_token', githubAccessToken, 1);
    }

    navigate('/profile');
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <FormTitle title="login" icon={<LoginOutlined />} />

      <div className="flex gap-3">
        <Link
          to="http://localhost:3000/oauth2/google"
          className="block w-full text-white default-clear"
        >
          <AuthOption authOption={<GoogleOutlined />} action={() => {}} />
        </Link>

        <Link
          to="http://localhost:3000/oauth2/github"
          className="block w-full text-white default-clear"
        >
          <AuthOption authOption={<GithubOutlined />} action={() => {}} />
        </Link>
      </div>

      <Separator />

      <BaseForm
        values={{
          email: '',
          password: '',
        }}
        validation={loginSchema}
        onSubmit={onSubmit}
        submitButtonText="Login"
        submitButtonIcon={<LoginOutlined />}
        checkboxName="remember me"
      />
    </div>
  );
}

export default Login;
