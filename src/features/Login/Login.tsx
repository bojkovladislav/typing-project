import { UserAddOutlined } from '@ant-design/icons';
import BaseForm from '../../components/ui/BaseForm/BaseForm';
import FormTitle from '../../components/ui/FormTitle/FormTitle';

function Login() {
  return (
    <div className="flex flex-col gap-2">
      <FormTitle title="register" icon={<UserAddOutlined />} />

      <BaseForm
        values={{
          username: '',
          email: '',
          password: '',
        }}
        onSubmit={() => console.log('submitted')}
      />
    </div>
  );
}

export default Login;
