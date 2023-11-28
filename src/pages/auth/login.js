import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthLayout from "@/components/AuthLayout";

import FacebookIcon from "../../../public/facebook_icon.svg";
import GoogleIcon from "../../../public/gogle_icon.svg";
import ManagementImage from "../../../public/management_icon.svg";

import { signinUser } from "../../../utils";

const Login = () => {
  const router = useRouter();

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [passwordErr, setPasswordErr] = useState(null);
  const [emailErr, setEmailErr] = useState(null);

  // Update state when the value changes
  function handleChange(e) {
    setLoginDetails((values) => {
      return {
        ...values,
        [e.target.name]: e.target.value,
      };
    });
  }

  // Function to log in users when the submit button is triggered
  async function handleSubmit(e) {
    e.preventDefault();

    // Check if any of the form field is empty
    if (
      !loginDetails.email ||
      loginDetails.email.trim() === "" ||
      loginDetails.email.trim().length < 1
    ) {
      setEmailErr("Provide your email address");
    }

    if (
      !loginDetails.password ||
      loginDetails.password.trim() === "" ||
      loginDetails.password.trim().length < 1
    ) {
      setPasswordErr("Provide your password");
    }

    if (emailErr || passwordErr) return;

    const result = await signinUser(loginDetails);

    console.log("Login user successfully.");
    console.log(result);

    if (result.status === "failed") {
      toast.error(result.message);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <AuthLayout
      title="TaskMaster | Login"
      description="Boost productivity at a 100x speed"
      keywords="Todo list | Task manager | Schedule Planner | Productivity"
    >
      <div className="h-screen block md:flex md:justify-between md:items-center bg-white">
        <div className="p-5 md:p-8 lg:p-16 xl:p-24 2xl:p-72 h-full w-full md:w-1/2 flex items-center">
          <div className="w-full">
            <div className="font-medium uppercase text-center text-xl text-blue-700">
              TaskMaster
            </div>
            <div>
              <h1 className="mt-3 font-bold text-center text-2xl">
                Log in to your Account
              </h1>
              <p className="mt-2 font-semibold text-center text-sm text-gray-500">
                Welcome back! Select method to log in:
              </p>
              <div className="mt-5 flex items-center justify-center">
                <button className="mr-3 px-[0.3rem] py-[0.5rem] w-32 flex items-center justify-center font-bold text-xs border border-gray-200 rounded-md">
                  <span className="mr-2">
                    <Image
                      src={GoogleIcon}
                      height={15}
                      width={15}
                      alt="login using google"
                    />
                  </span>
                  Google
                </button>
                <button className="px-[0.3rem] py-[0.5rem] w-32 flex items-center justify-center font-bold text-xs border border-gray-200 rounded-md">
                  <span className="mr-2">
                    <Image
                      src={FacebookIcon}
                      height={20}
                      width={20}
                      alt="login using google"
                    />
                  </span>
                  Facebook
                </button>
              </div>
            </div>

            <div className="my-5 flex items-center justify-center">
              <div className="w-1/3 border-b border-gray-200"></div>
              <div className="w-2/3 font-normal text-gray-400 text-center">
                or continue with email
              </div>
              <div className="w-1/3 border-b border-gray-200"></div>
            </div>

            {/* Form */}
            <div className="text-gray-500">
              {/* Email Form */}
              <div className="h-12 flex items-center border border-gray-200 rounded-md">
                <span className="w-14 flex items-center justify-center">
                  <EnvelopeIcon className="w-6 font-bold" />
                </span>
                <input
                  className="h-full w-full p-3 font-medium bg-white outline-none"
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  value={loginDetails.email}
                />
              </div>
              {emailErr && (
                <p className="font-bold text-xs text-red-500">{emailErr}</p>
              )}

              {/* Password Form */}
              <div className="mt-3 h-12 flex items-center border border-gray-200 rounded-md">
                <span className="w-14 flex items-center justify-center">
                  <LockClosedIcon className="w-6 font-bold" />
                </span>
                <input
                  className="h-full w-full p-3 font-medium bg-white outline-none"
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  value={loginDetails.password}
                />
              </div>
              {passwordErr && (
                <p className="font-bold text-xs text-red-500">{passwordErr}</p>
              )}

              <p className="mt-3 font-bold text-right text-xs text-blue-700">
                Forgot Password?
              </p>

              {/* Log Btn */}
              <button
                className="mt-10 h-12 w-full text-white bg-blue-700 rounded-md"
                onClick={handleSubmit}
              >
                Login
              </button>

              <p className="mt-5 font-medium text-center">
                Don&lsquo;t have an account?{" "}
                <Link className="text-blue-700" href="/auth/signup">
                  Create an account?
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="hidden h-full w-1/2 md:flex items-center justify-center bg-blue-800">
          <div>
            <Image
              src={ManagementImage}
              alt="Illustration of hectic business management"
              width={450}
              height={450}
              className="md:p-5"
            />
            <p className="mt-5 font-medium tracking-wider text-xl text-center text-white">
              Managing tasks made easy
            </p>
            <p className="font-light text-xs text-center text-white">
              Being able to manage and schedule task boost productivity
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
