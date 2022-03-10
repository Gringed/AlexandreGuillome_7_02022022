import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    const enjoy = document.getElementById("enjoy");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const confirmPwdError = document.querySelector(".password-confirm.error");
    const enjoyError = document.querySelector(".enjoy.error");

    confirmPwdError.innerHTML = "";
    enjoyError.innerHTML = "";

    if (password !== confirmPwd || !enjoy.checked) {
      if (password !== confirmPwd)
        confirmPwdError.innerHTML = "Les mots de passe ne sont pas identiques";

      if (!enjoy.checked)
        enjoyError.innerHTML = "Vous devez accepter la condition";
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          email,
          firstName,
          lastName,
          password,
        },
      })
        .then((res) => {
          if (res.data.errors) {
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
          }
          else{
              setFormSubmit(true)
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <h4 className="success">
            Inscription réussie, veuillez vous connecter
          </h4>
        </>
      ) : (
        <form onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            id="email"
            className="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <div className="email error"></div>
          <br />
          <label htmlFor="firstname">Prénom</label>
          <br />
          <input
            type="text"
            id="firstname"
            className="firstname"
            onChange={(e) => setFirstname(e.target.value)}
            value={firstName}
            required
            minLength="2"
          />
          <br />
          <label htmlFor="lastname">Nom de famille</label>
          <br />
          <input
            type="text"
            id="lastname"
            className="lastname"
            onChange={(e) => setLastname(e.target.value)}
            value={lastName}
            required
            minLength="2"
          />
          <br />
          <label htmlFor="password">Mot de passe</label>
          <br />
          <input
            type="password"
            id="password"
            className="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <div className="password error"></div>
          <br />
          <label htmlFor="password-conf">Confirmation du mot de passe</label>
          <br />
          <input
            type="password"
            id="password-conf"
            className="confirmPwd"
            onChange={(e) => setConfirmPwd(e.target.value)}
            value={confirmPwd}
          />
          <div className="password-confirm error"></div>
          <br />
          <input type="checkbox" id="enjoy" />
          <label htmlFor="enjoy">
            J'accepte <b>d'espionner mes collègues</b>
          </label>
          <div className="enjoy error"></div>
          <br />
          <input type="submit" value="S'inscrire" />
        </form>
      )}
    </>
  );
};

export default SignUpForm;
