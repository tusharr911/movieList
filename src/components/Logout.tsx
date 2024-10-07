import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearWatchList } from "../store/MovieSlice";
import Tooltip from "./Tooltip";

export default function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleLogout() {
    Cookies.remove("user");
    dispatch(clearWatchList());
    navigate("/login", { replace: true });
  }

  return (
    <Tooltip text="Logout">
      <div className="relative flex items-center">
        <svg
          className="cursor-pointer"
          onClick={handleLogout}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      </div>
    </Tooltip>
  );
}
