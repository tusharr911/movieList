type SearchBarProps = {
  searchQuery: string;
  handleSearchQuery: (query: string) => void;
};

export default function SearchBar({
  searchQuery,
  handleSearchQuery,
}: SearchBarProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    handleSearchQuery(event.target.value);
  }
  return (
    <form className="relative w-[60vw] mx-auto mt-5">
      <input
        value={searchQuery}
        onChange={(event) => handleSubmit(event)}
        type="search"
        placeholder="Search movies"
        className="w-full h-9 pl-4 pr-10 outline-none hover:shadow-lg transition-all ring-1 ring-black/10 hover:ring-0  "
      />
      <button type="submit" className="absolute right-2 top-2">
        <img src="/search.svg" alt="search icon" className="w-5 h-5 " />
      </button>
    </form>
  );
}
