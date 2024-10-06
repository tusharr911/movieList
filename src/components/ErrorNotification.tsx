import React, { useEffect } from "react";

interface ErrorNotificationProps {
  message?: string;
  show: boolean;
  setShow: (show: boolean) => void;
}

const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  message = "An unexpected error occurred.",
  show,
  setShow,
}) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [show, setShow]);

  return (
    <div
      className={`fixed top-4 right-4 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-2 transition-transform transform ${
        show ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
      role="alert"
    >
      <svg
        className="w-6 h-6 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
      <span className="font-medium">Error:</span>
      <span>{message}</span>
      <button
        onClick={() => setShow(false)}
        className="ml-auto text-white hover:text-gray-200"
      >
        &times;
      </button>
    </div>
  );
};

export default ErrorNotification;
