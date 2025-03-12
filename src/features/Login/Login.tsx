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

function Login() {
  function onSubmit(values: LoginSchema) {
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
