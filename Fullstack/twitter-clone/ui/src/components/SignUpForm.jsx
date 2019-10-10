import React, { useState, useGlobal } from "reactn";

import { Redirect } from "react-router-dom";

import client from '../api/client';

const SignUpForm = props => {
  const { 1: setToken } = useGlobal("token");

  const [formState, setFormState] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [signedUp, setSignedUp] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdate = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  const signUp = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const { data } = await client.post("/auth/sign-up", formState);
      setSignedUp(true);
    } catch(error) {
      setError("Invalid user information!");
    }

    try {
      const { data: tokenData } = await client.post("/auth/login", {
        email: formState.email,
        password: formState.password,
      });

      setToken(tokenData.token);
    } catch(error) {}
  }

  return (
    <div>
      {signedUp && (
        <Redirect to={props.redirect || "/"} />
      )}
      {error && (
        <div><em>{error}</em></div>
      )}
      <form onSubmit={signUp}>
        <input
          type="email"
          name="email"
          onChange={handleUpdate}
          value={formState.email}
          placeholder="E-mail..."
        />
        <input
          type="password"
          name="password"
          onChange={handleUpdate}
          value={formState.password}
          placeholder="Password..."
        />
        <input
          type="password"
          name="passwordConfirm"
          onChange={handleUpdate}
          value={formState.passwordConfirm}
          placeholder="Confirm password..."
        />
        <button>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
