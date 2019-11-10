import React from "react";
import { GoogleLogin } from "react-google-login";
import KEY from "../../../config/keys";
const google = props => {
  return (
    <div style={{ textAlign: "center", margin: "0 auto" }}>
      {/* Standard react component import */}
      <GoogleLogin
        clientId={KEY.googleLogin}
        buttonText="Google"
        onSuccess={props.responseGoogle}
        onFailure={props.responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default google;
