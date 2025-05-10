import { UserAddOutlined } from '@ant-design/icons';
import BaseForm from '../../components/ui/BaseForm/BaseForm';
import FormTitle from '../../components/ui/FormTitle/FormTitle';
import { signUpSchema, SignUpSchema } from '../../validations/SignUpSchema';
import { signup } from '../../api/auth';
import { useNotification } from '../../hooks/useNotification';

function SignUp() {
  const { handleAuthNotifications } = useNotification();

  async function onSubmit(values: SignUpSchema) {
    const { username, email, password } = values;

    const response = await signup({ username, email, password });

    handleAuthNotifications(response);

    // Here, write code for the further redirecting or whatnot
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
