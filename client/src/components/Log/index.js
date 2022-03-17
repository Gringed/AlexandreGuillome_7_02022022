import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const Log = (props) => {
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [signInModal, setSignInModel] = useState(props.signin);

  const handleModals = (event) => {
    if (event.target.id === "register") {
      setSignInModel(false);
      setSignUpModal(true);
    } else if (event.target.id === "login") {
      setSignUpModal(false);
      setSignInModel(true);
    }
  };

  return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li
            onClick={handleModals}
            id="register"
            className={signUpModal ? "active-btn" : null}
          >
            Inscription
          </li>
          <li
            onClick={handleModals}
            id="login"
            className={signInModal ? "active-btn" : null}
          >
            Connexion
          </li>
        </ul>
        {signUpModal && <SignUpForm />}
        {signInModal && <SignInForm />}
        
      </div>
    </div>
  );
};

export default Log;
