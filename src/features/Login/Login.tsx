import BaseForm from '../../components/ui/BaseForm/BaseForm';

function Login() {
  return (
    <BaseForm
      values={{
        username: '',
        email: '',
        password: '',
      }}
      onSubmit={() => console.log('submitted')}
    />
  );
}

export default Login;
