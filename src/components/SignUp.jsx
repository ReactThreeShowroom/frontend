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
    <div class="flex justify-center h-screen w-screen items-center flex-col">
      <div className="text-grey-darker text-md font-bold mb-2 underline">
        Sign Up
      </div>
      <div class="w-full md:w-1/2 flex flex-col items-center ">
        <div class="mb-4">
          <label
            class="block text-grey-darker text-sm font-bold mb-2"
            for="Email"
          >
            Email
          </label>
          <input
            class="shadow border rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="Email"
            type="text"
            placeholder="Email"
          />
        </div>
        <div class="mb-3">
          <label
            class="block text-grey-darker text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            class="shadow border rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="password"
            type="password"
            placeholder="******************"
          />
          <p class="text-red text-xs italic">Please choose a password.</p>
        </div>
        <div class="mb-6">
          <label
            class="block text-grey-darker text-sm font-bold mb-2"
            for="password confirmation"
          >
            Password
          </label>
          <input
            class="shadow border rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="password"
            type="password"
            placeholder="******************"
          />
          <p class="text-red text-xs italic">Please confirm your password.</p>
        </div>
      </div>
      <div class="flex items-center justify-between flex-col">
        <button
          class="bg-main-orange w-full my-2 rounded"
          type="button"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
        <a
          class=" font-bold text-sm"
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
