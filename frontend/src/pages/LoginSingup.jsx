import React, { useState } from "react";
import "./css/loginsingup.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginSingup = () => {
  const [state, setState] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const shakeForm = () => {
    const formContainer = document.querySelector(".loginsingup-container");
    formContainer.classList.add("shake");
    setTimeout(() => {
      formContainer.classList.remove("shake");
    }, 500);
  };

  const displayValidationErrors = (errors) => {
    errors.forEach((error) => {
      toast.error(error.msg);
    });
  };

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:4000/api/v1/user/login", {
        email: formData.email,
        password: formData.password,
      });

      if (res.data.success) {
        toast.success("Login Success");
        localStorage.setItem("auth-token", res.data.token);
        window.location.replace("/");
      } else {
        toast.error("Login Failed");
        shakeForm(); // Trigger animation on error
      }
    } catch (error) {
      console.log(error);
      if (error.res && error.res.data.errors) {
        displayValidationErrors(error.res.data.errors);
      } else {
        toast.error("An unexpected while login error occurred.");
      }
      shakeForm(); // Trigger animation on error
    }
  };

  const signup = async () => {
    try {
      const res = await axios.post("http://localhost:4000/api/v1/user/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (res.data.success) {
        toast.success("Signup Success");
        localStorage.setItem("auth-token", res.data.token);
        window.location.replace("http://localhost:5173/login");
      } else {
        toast.error("Signup Failed");
        shakeForm();
        alert(res.error)
      }
    } catch (error) {
      console.log(error);
      if (error.res && error.res.data.errors) {
        displayValidationErrors(error.res.data.errors);
      } else {
        toast.error("An unexpected error occurred.");
      }
      shakeForm();
    }
  };

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="loginsignup">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"></svg>
      <div className="loginsingup-container">
        <h1>{state}</h1>
        <div className="loginsingup-fileds">
          {state === "singup" ? (
            <input
              onChange={onChangeHandler}
              value={formData.name}
              type="text"
              required
              placeholder="First Name"
              name="name"
            />
          ) : null}

          <input
            type="email"
            required
            placeholder="Email"
            name="email"
            onChange={onChangeHandler}
            value={formData.email}
          />
          <input
            type="password"
            name="password"
            onChange={onChangeHandler}
            value={formData.password}
            required
            placeholder="Password"
          />
        </div>
        <button onClick={() => (state === "login" ? login() : signup())}>
          {state}
        </button>
        <div className="loginsingup-login">
          {state === "singup" ? (
            <p>
              Already have an account?{" "}
              <span onClick={() => setState("login")}>Log in</span>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <span onClick={() => setState("singup")}>Create</span>
            </p>
          )}

          <div className="loginsingup-agree">
            <input type="checkbox" required name="" id="" />
            <p>
              I agree to the <span>Terms and Conditions</span>
            </p>
          </div>
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#ffd700"
          fillOpacity="1"
          d="M0,32L16,58.7C32,85,64,139,96,160C128,181,160,171,192,149.3C224,128,256,96,288,117.3C320,139,352,213,384,256C416,299,448,309,480,298.7C512,288,544,256,576,234.7C608,213,640,203,672,208C704,213,736,235,768,218.7C800,203,832,149,864,117.3C896,85,928,75,960,64C992,53,1024,43,1056,74.7C1088,107,1120,181,1152,192C1184,203,1216,149,1248,128C1280,107,1312,117,1344,101.3C1376,85,1408,43,1424,21.3L1440,0L1440,320L1424,320C1408,320,1376,320,1344,320C1312,320,1280,320,1248,320C1216,320,1184,320,1152,320C1120,320,1088,320,1056,320C1024,320,992,320,960,320C928,320,896,320,864,320C832,320,800,320,768,320C736,320,704,320,672,320C640,320,608,320,576,320C544,320,512,320,480,320C448,320,416,320,384,320C352,320,320,320,288,320C256,320,224,320,192,320C160,320,128,320,96,320C64,320,32,320,16,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default LoginSingup;
