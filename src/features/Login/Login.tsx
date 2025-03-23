import {
  GithubOutlined,
  GoogleOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import FormTitle from '../../components/ui/FormTitle/FormTitle';
import BaseForm from '../../components/ui/BaseForm/BaseForm';
import AuthOption from '../../components/AuthOption/AuthOption';
import Separator from '../../components/Separator/Separator';
// import { loginSchema, LoginRequest } from '../../../../shared-types/src/index';
import { loginSchema } from '../../../../shared-types/src/validationSchemas';
import { LoginRequest } from '../../../../shared-types/src/types';

function Login() {
  function onSubmit(values: LoginRequest) {
    console.log("You've been successfully authenticated! ", values);
  }

  return (
    <div className="flex flex-col gap-2">
      <FormTitle title="login" icon={<LoginOutlined />} />

      <div className="flex gap-3">
        <AuthOption authOption={<GoogleOutlined />} action={() => {}} />
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
