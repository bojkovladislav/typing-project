import { UserAddOutlined } from '@ant-design/icons';
import BaseForm from '../../components/ui/BaseForm/BaseForm';
import FormTitle from '../../components/ui/FormTitle/FormTitle';
import { signUpSchema, SignUpSchema } from '../../validations/SignUpSchema';
import { signup } from '../../api/auth';
import { useContext } from 'react';
import {
  NotificationContext,
  NotificationContextType,
} from '../../contexts/NotificationContext';
import { MESSAGE_STATUS } from '../../types/notification';

function SignUp() {
  const { add } = useContext(NotificationContext) as NotificationContextType;

  async function onSubmit(values: SignUpSchema) {
    const { username, email, password } = values;

    const response = await signup({ username, email, password });

    add({
      message: response.error,
      status: MESSAGE_STATUS.FAIL,
      position: {
        centered: true,
      },
    });

    // CODE HERE
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
