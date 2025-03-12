import Login from '../../features/Login/Login';
import SignUp from '../../features/SignUp/SignUp';

function Authorize() {
  return (
    <div className="flex justify-evenly">
      <SignUp />

      <Login />
    </div>
  );
}

export default Authorize;
