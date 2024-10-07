import { useNavigate } from "react-router-dom";
export default function Logo() {
  const navigate = useNavigate();
  function handleClickHome() {
    navigate("/");
  }
  return (
    <div>
      <h2
        onClick={handleClickHome}
        className="text-2xl font-bold mb-4 cursor-pointer"
      >
        Movie List
      </h2>
    </div>
  );
}
