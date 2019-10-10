import React, { useGlobal } from "reactn";
import { Redirect } from "react-router-dom";

const Logout = (props) => {
  const [token, setToken] = useGlobal("token");
  return (
    <>
      {(!token && props.redirect) && (
        <Redirect push to={props.redirect} />
      )}
      <button onClick={() => setToken(null)}>Logout</button>
    </>
  );
}

export default Logout;