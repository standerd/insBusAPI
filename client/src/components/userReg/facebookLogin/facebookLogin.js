import React from "react";
import FacebookLogin from "react-facebook-login";
import KEY from "../../../config/keys";

//Facebook login component, login handler is passed via props received from the landing page.
const facebook = props => {
  return (
    <div>
      <br></br>
      {/* Standard react component import */}
      <FacebookLogin
        appId={KEY.appId}
        autoLoad={false}
        fields="name,email,picture"
        callback={props.responseFacebook}
      />
    </div>
  );
};

export default facebook;
