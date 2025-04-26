import { UserAddOutlined } from '@ant-design/icons';
import BaseForm from '../../components/ui/BaseForm/BaseForm';
import FormTitle from '../../components/ui/FormTitle/FormTitle';
import { signUpSchema, SignUpSchema } from '../../validations/SignUpSchema';
import { signup } from '../../api/auth';

function SignUp() {
  async function onSubmit(values: SignUpSchema) {
    const { username, email, password } = values;

    const response = await signup({ username, email, password });

    if (typeof response.data === 'object') {
      console.log('Response after sending data: ', response.data.token);
    } else {
      console.log('An Error has occurred!');
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <FormTitle title="register" icon={<UserAddOutlined />} />

      <BaseForm
        values={{
          username: '',
          email: '',
          verifyEmail: '',
          password: '',
          verifyPassword: '',
        }}
        validation={signUpSchema}
        onSubmit={onSubmit}
        submitButtonText="Sign Up"
        submitButtonIcon={<UserAddOutlined />}
      />
    </div>
  );
}

export default SignUp;
