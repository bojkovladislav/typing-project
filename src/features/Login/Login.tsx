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
import { LoginSchema } from '../../validations/LoginSchema';
import { loginSchema } from '../../../../shared-types/src/validationSchemas';

function Login() {
  const navigate = useNavigate();

  function onSubmit(values: LoginSchema) {
    console.log("You've been successfully authenticated! ", values);
  }

  useEffect(() => {
    const accessToken = getUrlParts()['access_token'];

    if (accessToken) {
      setCookie('google_access_token', accessToken, 1);

      navigate('/profile');
    }
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <FormTitle title="login" icon={<LoginOutlined />} />

      <div className="flex gap-3">
        <Link to="http://localhost:3000/oauth2/google">
          <AuthOption authOption={<GoogleOutlined />} action={() => {}} />
        </Link>

        <AuthOption authOption={<GithubOutlined />} action={() => {}} />
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
