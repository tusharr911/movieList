import { useForm } from "react-hook-form";

type SearchBarProps = {
  handleSearchQuery: (query: string) => void;
};

type FormData = {
  query: string;
};

export default function SearchBar({ handleSearchQuery }: SearchBarProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  function handleQuery(data: FormData) {
    handleSearchQuery(data.query);
  }

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
        className="w-full h-9 pl-4 pr-10 outline-none hover:shadow-lg transition-all ring-1 ring-black/10 hover:ring-0"
      />
      {errors.query && (
        <p className="text-red-500">{errors.query.message}</p>
      )}
      <button
        type="submit"
        className="absolute right-2 top-2"
        disabled={isSubmitting}
      >
        <img src="/search.svg" alt="search icon" className="w-5 h-5" />
      </button>
    </form>
  );
}
