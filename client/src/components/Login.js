import React, { useState, render } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

const LoginForm = (props) => {
  const [name, setName] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    e.preventDefault();
    setName({ ...name, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const login = (e) => {
    e.preventDefault();
    setName({ ...name, isLoading: true });
    axios
      .post("http://localhost:5000/api/login", name)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.payload);
      })
      .catch((err) => console.log(err.response));
    props.history.push("/protect");
  };

  return (
    <div className="login-card">
      <form
        className="login-modal"
        onSubmit={(e) => handleSubmit(e)}
        onKeyDown={props.closeLoginHandler2}
        tabIndex="0"
      >
        <h1 className="title">Title</h1>
        <p clasName="login-inputs">
          <label>
            Username:
            <input
              className="input-forms"
              type="text"
              name="username"
              onChange={changeHandler}
              value={name.username}
            />
          </label>
        </p>
        <p className="login-inputs">
          <label>
            Password:{" "}
            <input
              className="input-forms"
              type="password"
              onChange={changeHandler}
              value={name.password}
            />
          </label>
        </p>
        <button type="submit" className="login-button" onClick={login}>
          Login
        </button>
      </form>
    </div>
  );
};

export default withRouter(LoginForm);
