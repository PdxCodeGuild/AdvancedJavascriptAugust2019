import React, { useGlobal } from "reactn";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({component: Component, redirect, ...rest}) => {
  const { 0: token } = useGlobal("token");

  return (
    <Route {...rest} render={(props) => (
      (token !== null)
        ? <Component {...props} />
        : <Redirect to={redirect || "/"} />
    )} />
  )
}

export default PrivateRoute;