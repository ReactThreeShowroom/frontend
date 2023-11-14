import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PasswordReset = () => {
  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };
  return (
    <div class="flex justify-center h-screen w-screen items-center flex-col">
      {submitted && (
        <>
          <div className="text-grey-darker text-md font-bold mb-2 underline ">
            Reset Password
          </div>
          <div class="w-full md:w-1/2 flex flex-col items-center ">
            <div class="mb-4 w-7/12">
              <div class="block text-grey-darker text-sm font-bold mb-2 ">
                An email will be sent to the email address submitted if we have
                it on file with further instructions. Thank you.
              </div>
              <button
                class="bg-main-orange w-full my-2 rounded "
                type="button"
                onClick={() => navigate("/signin")}
              >
                Back to sign in
              </button>
            </div>
          </div>
        </>
      )}
      {!submitted && (
        <>
          <div className="text-grey-darker text-md font-bold mb-2 underline">
            Reset Password
          </div>
          <div class="w-full md:w-1/2 flex flex-col items-center  ">
            <div class="mb-4">
              <label
                class="block text-grey-darker text-sm font-bold mb-2"
                for="Email"
              >
                Please enter your email address.
              </label>
              <input
                class="shadow border rounded w-full py-2 px-3 text-grey-darker mb-3"
                id="Email"
                type="text"
                placeholder="Email"
              />
              <div class="flex items-center justify-between flex-col">
                <button
                  class="bg-main-orange w-full my-2 rounded "
                  type="button"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PasswordReset;
