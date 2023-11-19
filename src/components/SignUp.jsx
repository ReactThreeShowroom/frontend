import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSignUp = () => {
    console.log("Signing up...");
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
  };

  return (
    <div className="flex justify-center h-screen w-screen items-center flex-col">
      <div className="text-grey-darker text-md font-bold mb-2 underline">
        Sign Up
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-center ">
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="Email"
          >
            Email
          </label>
          <input
            className="shadow border rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="Email"
            name="Email"
            type="text"
            placeholder="Email"
          />
        </div>
        <div className="mb-3">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow border rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="password"
            name="password"
            type="password"
            placeholder="******************"
          />
          <p className="text-red text-xs italic">Please choose a password.</p>
        </div>
        <div className="mb-6">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="passwordConfirmation"
          >
            Confirm Password
          </label>
          <input
            className="shadow border rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="passwordConfirmation"
            name="passwordConfirmation"
            type="password"
            placeholder="******************"
          />
          <p className="text-red text-xs italic">Please confirm your password.</p>
        </div>
      </div>
      <div className="flex items-center justify-between flex-col">
        <button
          className="bg-main-orange w-full my-2 rounded"
          type="button"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
        <a
          className=" font-bold text-sm"
          href="#"
          onClick={() => navigate(`/signin/`)}
        >
          Already have an account?
        </a>
      </div>
    </div>
  );
};

export default SignUp;
