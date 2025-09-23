import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Input from "../../../Shared/Components/FormElements/input";
// Removed Dropdown – not needed for signup
import { SnackbarProvider, useSnackbar } from "notistack";
import Toast from "../../../Shared/Components/UiElements/Toast/Toast";
import Button from "../../../Shared/Components/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../../Shared/Components/util/validate";
import { useForm } from "../../../Shared/hooks/form-hook";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Shared/Components/UiElements/Loader";

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

// Removed Type/Dropdown – not needed for signup

const EmployeeForm = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);
  const [formState, inputHandler] = useForm(
    {
      name: { value: "", isValid: false },
      mail: { value: "", isValid: false },
      password: { value: "", isValid: false },
    },
    false
  );

  // NEW: Google Signup button
  const googleSignupRef = useRef(null);

  const handleGoogleSignupCredential = async (response) => {
    try {
      const idToken = response.credential;
      const res = await axios.post(
        "http://localhost:5000/auth/google/employee/signup",
        { idToken }
      );

      if (res.data?.message === "admin") {
        Toast("Signup successful! Please sign in.", "success");
        navigate("/loginemployee");
      } else {
        Toast("Signup completed.", "success");
        navigate("/loginemployee");
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        Toast("Account already exists. Please sign in.", "error");
        navigate("/loginemployee");
      } else {
        Toast("Google signup failed. Try again.", "error");
      }
    }
  };

  useEffect(() => {
    if (!window.google || !GOOGLE_CLIENT_ID) return;

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleGoogleSignupCredential,
    });

    if (googleSignupRef.current) {
      window.google.accounts.id.renderButton(googleSignupRef.current, {
        theme: "outline",
        size: "large",
        text: "signup_with",
        shape: "pill",
        width: 320,
      });
    }
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:5000/EmployeeLogin/new", {
        name: formState.inputs.name.value,
        username: formState.inputs.mail.value,
        password: formState.inputs.password.value,
      })
      .then(() => {
        setLoading(false);
        Toast("Signup successful! Please sign in.", "success");
        navigate("/loginemployee");
      })
      .catch((err) => {
        enqueueSnackbar("error", { variant: "Error" });
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <form onSubmit={submitHandler}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="min-h-full px-6 py-10 bg-gray-100 flex items-center justify-center">
            <div className="container mx-auto">
              <div>
                <h2 className="font-semibold text-xl text-gray-600 text-center">
                  Sign Up
                </h2>
                <p className="text-gray-500 mb-6 text-center">
                  Create your admin account
                </p>

                {/* NEW: Google Signup section */}
                <div className="flex justify-center mb-6">
                  <div ref={googleSignupRef}></div>
                </div>

                <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div className="md:col-span-5">
                          <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="name"
                            type="text"
                            placeholder="Enter Employee Name"
                            label="Name :"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please Enter a Name."
                            onInput={inputHandler}
                          />
                        </div>

                        <div className="md:col-span-5">
                          <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="mail"
                            type="text"
                            placeholder="Enter email address"
                            label="Email Address :"
                            validators={[VALIDATOR_EMAIL()]}
                            errorText="Please Enter a valid EMail address"
                            onInput={inputHandler}
                          />
                        </div>
                        <div className="md:col-span-5">
                          <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="password"
                            type="password"
                            placeholder="Create a password"
                            label="Password :"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter a password"
                            onInput={inputHandler}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <Button
                          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          type="submit"
                          disabled={!formState.isValid}
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </form>
  );
};

export default EmployeeForm;
