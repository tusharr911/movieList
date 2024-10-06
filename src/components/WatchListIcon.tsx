import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function WatchListIcon() {
  const length = useSelector((state) => state.movie.length);
  const navigate = useNavigate();

  function HandleWatchList() {
    navigate("/watchList");
  }

  return (
    <div
      className="relative inline-block cursor-pointer"
      onClick={HandleWatchList}
    >
      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
        {length}
      </span>

      <img src="/bookmarks.svg" alt="bookmark icon" className="w-5 h-5" />
    </div>
  );
}
