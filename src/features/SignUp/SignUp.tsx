import { UserAddOutlined } from '@ant-design/icons';
import BaseForm from '../../components/ui/BaseForm/BaseForm';
import FormTitle from '../../components/ui/FormTitle/FormTitle';
import { SignUpSchema } from '../../validations/SignUpSchema';

function SignUp() {
  function onSubmit(values: SignUpSchema) {
    console.log('values submitted: ', values);
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
        validation={SignUpSchema}
        onSubmit={onSubmit}
        submitButtonText="Sign Up"
        submitButtonIcon={<UserAddOutlined />}
      />
    </div>
  );
}

export default SignUp;
