import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Button from "./Button";
import Loader from "./Loader";
import ErrorNotification from "./ErrorNotification";
import { useSetLocalStorage } from "../utils/hook";
import { useNavigate } from "react-router-dom";
type FormData = {
  email: string;
};

function SignUpComponent() {
  const [loading, setLoading] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const signUp: SubmitHandler<FormData> = (data) => {
    setLoading(true);
    try {
      setSubmittedData(data.email);
      const user = localStorage.getItem(data.email);
      if (!user) {
        Cookies.set("user", data.email, {
          sameSite: "None",
          secure: true,
        });

        localStorage.setItem(
          data.email,
          JSON.stringify({
            authenticated: true,
            watchList: [],
          })
        );
        throw new Error("Account created. Please Login");
      } else {
        throw new Error("The user already exists. Please use Login");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setShowError(true);
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred");
      }
    } finally {
      reset();
      setLoading(false);
      navigate("/");
    }
  };

  useSetLocalStorage(submittedData);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="relative flex flex-col text-gray-700 bg-transparent shadow-md rounded-xl bg-clip-border bg-white px-8 pt-6 pb-8 mb-4">
      <ErrorNotification
        message={errorMessage}
        show={showError}
        setShow={setShowError}
        success
      />
      <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
        Sign Up
      </h4>
      <p className="block mt-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
        Nice to meet you! Enter your details to register.
      </p>
      <form
        onSubmit={handleSubmit(signUp)}
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
        <Button
          className="mt-6 block w-full select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="submit"
          disabled={isSubmitting}
        >
          sign up
        </Button>
        <p className="block mt-4 font-sans text-base antialiased font-normal leading-relaxed text-center text-gray-700">
          Already have an account?&nbsp;
          <Link to="/login" className="font-medium text-gray-900">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUpComponent;
