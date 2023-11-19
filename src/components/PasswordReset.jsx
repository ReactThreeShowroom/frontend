import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PasswordReset = () => {
  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true);
  };
  return (
    <div className="flex justify-center h-screen w-screen items-center flex-col">
      {submitted ? (
        <>
          <p className="text-grey-darker text-md font-bold mb-2 underline">
            Reset Password
          </p>
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <div className="mb-4 w-7/12">
              <p className="block text-grey-darker text-sm font-bold mb-2">
                An email will be sent to the email address submitted if we have
                it on file with further instructions. Thank you.
              </p>
              <button
                className="bg-main-orange w-full my-2 rounded"
                type="button"
                onClick={() => navigate("/signin")}
              >
                Back to sign in
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <p className="text-grey-darker text-md font-bold mb-2 underline">
            Reset Password
          </p>
          <form className="w-full md:w-1/2 flex flex-col items-center" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="Email"
              >
                Please enter your email address.
              </label>
              <input
                className="shadow border rounded w-full py-2 px-3 text-grey-darker mb-3"
                id="Email"
                name="Email"
                type="text"
                placeholder="Email"
              />
              <div className="flex items-center justify-between flex-col">
                <button
                  className="bg-main-orange w-full my-2 rounded"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default PasswordReset;
