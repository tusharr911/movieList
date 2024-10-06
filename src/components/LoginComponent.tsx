import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import Loader from "./Loader";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ErrorNotification from "./ErrorNotification";
import { useDispatch } from "react-redux";
import { initiateWatchList } from "../store/MovieSlice";
import Cookies from "js-cookie";

function LoginComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const login = (data) => {
    setLoading(true);
    try {
      const user = localStorage.getItem(data.email);
      if (user) {
        Cookies.set("user", data.email);
        navigate("/");
        dispatch(initiateWatchList(JSON.parse(user).watchList));
      } else {
        throw new Error("The user does not exist.");
      }
    } catch (error) {
      setShowError(true);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
      reset();
    }
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="relative flex flex-col text-gray-700 bg-transparent shadow-md rounded-xl bg-clip-border bg-white px-8 pt-6 pb-8 mb-4">
      <ErrorNotification
        message={errorMessage}
        show={showError}
        setShow={setShowError}
      />
      <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
        Login
      </h4>
      <p className="block mt-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
        Enter your details to login.
      </p>
      <form
        onSubmit={handleSubmit(login)}
        className="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96"
      >
        <div className="flex flex-col gap-6 mb-1">
          <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
            Your Email
          </h6>
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              placeholder="name@mail.com"
              className="peer h-full w-full rounded-md border border-blue-gray-200 shadow border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (value) =>
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
                      value
                    ) || "Email address must be valid",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 block">{errors.email.message}</p>
            )}
          </div>
        </div>
        <div className="inline-flex items-center"></div>
        <Button
          className="mt-6 block w-full select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="submit"
          disabled={isSubmitting ? true : false}
        >
          sign in
        </Button>
        <p className="block mt-4 font-sans text-base antialiased font-normal leading-relaxed text-center text-gray-700">
          Don&apos;t have an account?&nbsp;
          <Link to="/signup" className="font-medium text-gray-900">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginComponent;
