import { useNavigate } from "react-router-dom";
export default function Logo() {
  const navigate = useNavigate();
  function handleClickHome(): void {
    navigate("/");
  }
  return (
    <div>
      <h2
        onClick={handleClickHome}
        className="md:text-2xl text-lg font-bold mb-4 cursor-pointer "
      >
        Movie List
      </h2>
    </div>
  );
}
