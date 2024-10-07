import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import Header from "./components/Header";
export default function Layout() {
  const user = Cookies.get("user");
  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <div className="w-[65vw] mx-auto my-5 flex flex-col gap-5">
      <Header />
      <Outlet />
    </div>
  );
}
