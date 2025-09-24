import React, { useContext, useRef, useState, useEffect } from "react";
import axios from "axios";
import { withCsrf } from "../utils/csrf";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Shared/Components/context/authcontext";
import { Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import Toast from "../Shared/Components/UiElements/Toast/Toast";

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export const LoginPage = () => {
  const auth = useContext(AuthContext);
  const [mail, setMail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const googleBtnRef = useRef(null);

  const handleGoogleCredential = async (response) => {
    try {
      const idToken = response.credential;
      const res = await withCsrf(
        axios.post,
        "http://localhost:5000/auth/google/customer",
        { idToken },
        { withCredentials: true }
      );
      if (res.data?.message === "Success" && res.data?.user?._id) {
        auth.login(res.data.user._id);
        Toast("Signed in with Google ✅", "success");
        navigate("/Products");
      } else {
        Toast("Google sign-in failed. Try email/password or sign up.", "error");
      }
    } catch (err) {
      console.error(err);
      const status = err?.response?.status;
      const msg = err?.response?.data?.message || "";
      if (status === 401 && /customer not found/i.test(msg)) {
        Toast(
          "No account found for this Google email. Please sign up.",
          "warning"
        );
      } else if (status === 401 && /invalid google token/i.test(msg)) {
        Toast("Invalid Google sign-in. Please try again.", "error");
      } else {
        Toast(
          "Google sign-in failed. Try again or use email/password.",
          "error"
        );
      }
    }
  };

  useEffect(() => {
    if (!window.google || !GOOGLE_CLIENT_ID) return;
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleGoogleCredential,
    });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await withCsrf(
        axios.post,
        "http://localhost:5000/login/",
        { mail, password },
        { withCredentials: true }
      );
      if (res.data?.message === "Success") {
        auth.login(res.data.user._id);
        Toast("Login Successfully !!", "success");
        navigate("/Products");
      } else if (typeof res.data === "string") {
        if (/no record exsisted/i.test(res.data)) {
          Toast("No account found for this email. Please register.", "warning");
        } else if (/password is incorrect/i.test(res.data)) {
          Toast("Incorrect password. Please try again.", "error");
        } else {
          Toast("Login failed. Please try again.", "error");
        }
      } else if (typeof res.data?.message === "string") {
        const msg = res.data.message;
        if (/no record/i.test(msg)) {
          Toast("No account found for this email. Please register.", "warning");
        } else if (/password/i.test(msg) && /incorrect/i.test(msg)) {
          Toast("Incorrect password. Please try again.", "error");
        } else {
          Toast(msg, "error");
        }
      } else {
        Toast("Invalid email / password", "error");
      }
    } catch (err) {
      console.log(err);
      const status = err?.response?.status;
      const data = err?.response?.data;
      const msg = (typeof data === "string" ? data : data?.message) || "";
      if (/no record/i.test(msg)) {
        Toast("No account found for this email. Please register.", "warning");
      } else if (/password/i.test(msg) && /incorrect/i.test(msg)) {
        Toast("Incorrect password. Please try again.", "error");
      } else if (status === 429) {
        Toast("Too many attempts. Please wait and try again.", "warning");
      } else {
        Toast("Login failed. Please try again.", "error");
      }
    }
  };

  return (
    <div
      className="h-screen"
      style={{
        backgroundImage: `url('/img/cuslogin.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <section className="m-8 pt-14 flex gap-4">
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
              Enter your email and password to Sign In.
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
                onChange={(e) => setMail(e.target.value)}
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

            <div className="my-4 text-center text-sm text-blue-gray-600">
              or
            </div>
            <div ref={googleBtnRef} className="flex justify-center"></div>

            <Typography
              variant="paragraph"
              className="text-center text-blue-gray-500 font-medium mt-4"
            >
              Not registered?
              <Link to="/Customer/create" className="text-gray-900 ml-1">
                Create account
              </Link>
            </Typography>
          </form>
        </div>
        <div className="w-2/5 h-full hidden lg:block">
          <img
            src="/img/items.jpg"
            className="h-full w-full object-cover rounded-3xl"
          />
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
