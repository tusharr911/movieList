import { useForm } from "react-hook-form";
type SearchBarProps = {
  searchQuery: string;
  handleSearchQuery: (query: string) => void;
};

export default function SearchBar({
  searchQuery,
  handleSearchQuery,
}: SearchBarProps) {
  function handleQuery(data) {
    handleSearchQuery(data.query);
  }
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  return (
    <form
      onSubmit={handleSubmit(handleQuery)}
      className="relative w-[60vw] mx-auto mt-5"
    >
      <input
        {...register("query", {
          required: "Enter a search query",
        })}
        type="search"
        placeholder="Search movies"
        className="w-full h-9 pl-4 pr-10 outline-none hover:shadow-lg transition-all ring-1 ring-black/10 hover:ring-0  "
      />
      <button
        type="submit"
        className="absolute right-2 top-2"
        disabled={isSubmitting ? true : false}
      >
        <img src="/search.svg" alt="search icon" className="w-5 h-5 " />
      </button>
    </form>
  );
}
