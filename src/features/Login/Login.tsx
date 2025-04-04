import {
  GithubOutlined,
  GoogleOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import FormTitle from '../../components/ui/FormTitle/FormTitle';
import BaseForm from '../../components/ui/BaseForm/BaseForm';
import { LoginSchema } from '../../validations/LoginSchema';
import AuthOption from '../../components/AuthOption/AuthOption';
import Separator from '../../components/Separator/Separator';
import { Link } from 'react-router';
import { useEffect } from 'react';

function Login() {
  function onSubmit(values: LoginSchema) {
    console.log("You've been successfully authenticated! ", values);
  }

  function getUrlParts() {
    const url = window.location.href;
    const queryString = url.split('?')[1];

    if (!queryString) return {};

    const parts: { [key: string]: string } = {};
    const hash = queryString.split('&');

    for (let i = 0; i < hash.length; i++) {
      const params = hash[i].split('=');
      parts[decodeURIComponent(params[0])] = decodeURIComponent(
        params[1] || ''
      );
    }

    return parts;
  }

  function setCookie(cname: string, cvalue: string, exdays: number): void {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);

    const expires = `expires=${d.toUTCString()}`;

    document.cookie = `${encodeURIComponent(cname)}=${encodeURIComponent(
      cvalue
    )};${expires};path=/`;
  }

  useEffect(() => {
    if (getUrlParts()['access_token']) {
      setCookie('google_access_token', getUrlParts()['access_token'], 1);
      console.log('Logged in successfully!');
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
        validation={LoginSchema}
        onSubmit={onSubmit}
        submitButtonText="Login"
        submitButtonIcon={<LoginOutlined />}
        checkboxName="remember me"
      />
    </div>
  );
}

export default Login;
