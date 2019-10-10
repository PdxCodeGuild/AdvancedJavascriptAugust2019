import React from "reactn";
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <div>
      <h1>Login:</h1>
      <LoginForm redirect="/" />
    </div>
  )
}

export default Login;