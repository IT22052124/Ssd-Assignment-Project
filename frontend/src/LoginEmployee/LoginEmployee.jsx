import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { EmployeeAuthContext } from "../Shared/Components/context/EmployeeAuthContext";
import { Input, Button, Typography } from "@material-tailwind/react";
import Toast from "../Shared/Components/UiElements/Toast/Toast";

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export const EmployeeLoginPage = () => {
  const auth = useContext(EmployeeAuthContext);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  // NEW: Google button container
  const googleBtnRef = useRef(null);

  // NEW: Handler for Google credential
  const handleGoogleCredential = async (response) => {
    try {
      const idToken = response.credential;
      const res = await axios.post(
        "http://localhost:5000/auth/google/employee",
        { idToken }
      );

      if (res.data?.message === "admin") {
        auth.login(res.data.employeeId, res.data?.avatarUrl);
        Toast("Signed in as Admin via Google ✅", "success");
        navigate("/Dashboard");
      } else if (res.data?.message === "cashier") {
        auth.cashierlogin(res.data.employeeId, res.data?.avatarUrl);
        Toast("Signed in as Cashier via Google ✅", "success");
        navigate("/Billing");
      } else {
        Toast("Google sign-in failed. Try email/password or sign up.", "error");
      }
    } catch (err) {
      console.error(err);
      Toast("Google sign-in failed. Try again or use email/password.", "error");
    }
  };

  // NEW: Initialize and render the Google button
  useEffect(() => {
    if (!window.google || !GOOGLE_CLIENT_ID) return;

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleGoogleCredential,
    });

    // Render Google button into our container
    if (googleBtnRef.current) {
      window.google.accounts.id.renderButton(googleBtnRef.current, {
        theme: "outline",
        size: "large",
        text: "signin_with",
        shape: "pill",
        width: 320,
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/EmployeeChecklogin/", { username, password })
      .then((res) => {
        if (res.data.message === "admin") {
          auth.login(res.data?.employeeId, res.data?.avatarUrl);
          Toast("Login Successfully !!", "success");
          navigate("/Dashboard");
        } else if (res.data.message === "cashier") {
          auth.cashierlogin(res.data?.employeeId, res.data?.avatarUrl);
          Toast("Login Successfully !!", "success");
          navigate("/Billing");
        } else {
          Toast("Invalid email / Password", "error");
        }
      })
      .catch(() => {
        Toast("Invalid", "error");
      });
  };

  return (
    <div
      className="h-screen"
      style={{
        backgroundImage: `url('/img/background.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <section className="m-8 pl-5 pt-14 flex gap-4">
        <div className="w-full lg:w-3/5 mt-24">
          <div className="text-center">
            <Typography variant="h2" className="font-bold mb-4">
              Sign In
            </Typography>
            <Typography
              variant="paragraph"
              color="blue-gray"
              className="text-lg font-normal"
            >
              Enter your email and password, or use Google.
            </Typography>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
            action="#"
          >
            <div className="mb-1 flex flex-col gap-6">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-medium"
              >
                Your email
              </Typography>
              <Input
                size="lg"
                type="email"
                placeholder="name@mail.com"
                onChange={(e) => setUsername(e.target.value)}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 placeholder:text-gray-500 placeholder:opacity-100"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-medium"
              >
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 placeholder:text-gray-500 placeholder:opacity-100"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            <Button className="mt-6" fullWidth type="submit">
              Sign In
            </Button>

            {/* NEW: Divider */}
            <div className="my-4 text-center text-sm text-blue-gray-600">
              or
            </div>

            {/* NEW: Google Sign-In button container */}
            <div ref={googleBtnRef} className="flex justify-center"></div>

            {/* NEW: Sign up link to Employee Form page */}
            <div className="mt-6 text-center">
              <Typography variant="small" color="blue-gray">
                Don’t have an account?
                <Link
                  to="/Employee/create"
                  className="text-gray-900 ml-1 underline"
                >
                  Sign up
                </Link>
              </Typography>
            </div>
          </form>
        </div>

        <div className="w-2/5 h-full hidden lg:block">
          <img
            src="/img/pattern.png"
            className="h-full w-full object-cover rounded-3xl"
            alt="pattern"
          />
        </div>
      </section>
    </div>
  );
};

export default EmployeeLoginPage;
