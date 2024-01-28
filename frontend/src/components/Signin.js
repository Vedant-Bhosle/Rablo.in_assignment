import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "https://rablo-in-assignment-26751m865-vedant-bhosles-projects.vercel.app/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
          email,
          password,
        }),
        credentials: "include",
      }
    );

    const data = await res.json();

    if (res.status === 400) {
      window.alert("Invalid Credentials");
      navigate("/signin");
    } else {
      console.log("logged in succesfully");
      window.alert("login Succesfully");
      navigate("/");
    }
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col ">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-xl  text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Login</h1>

          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />

          <button
            type="submit"
            onClick={onSubmit}
            className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-700 focus:outline-none my-1"
          >
            Login
          </button>
        </div>

        <div className="text-grey-dark mt-6">
          Dont have an account?
          <Link
            className="no-underline border-b border-blue text-blue"
            to="/signup"
          >
            Create Account
          </Link>
          .
        </div>
      </div>
    </div>
  );
}

export default Signin;
