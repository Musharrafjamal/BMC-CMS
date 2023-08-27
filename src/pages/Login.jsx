import { useState } from "react";
import "./Login.css";
import { auth } from "../firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {BiUserCircle} from 'react-icons/bi'

import { projectAuth } from "../firebaseconfig";

const Login = ({ gettingUsername }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);

  const navigate = useNavigate();

  const onSubmitLogin = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        gettingUsername(user.email)
        setErr(false);
        if( projectAuth.currentUser.email === 'musharraf@1.com'){
          return navigate("/dashboard");
        }
        if ( projectAuth.currentUser) {
          return navigate("/users");
        } else {
          return navigate("/");
        }
      })
      .catch((error) => {
        setErr(true);
      });
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <div className="login-title">{<BiUserCircle size={50} color="#ffffffb6" />} </div>
        <p className="login-title">Login</p>
        <form className="form" onSubmit={onSubmitLogin}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder=""
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder=""
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="sign" type="submit">
            Sign in
          </button>
          <div className="wrong-info">
            {err && <p>Wrong Email or Password</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
