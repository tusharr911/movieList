import { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";

export default function Homepage() {
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearchQuery(query: string) {
    setSearchQuery(query);
  }
  return (
    <div className="w-[65vw] mx-auto my-5 flex flex-col gap-5 ">
      <Header></Header>
      <SearchBar
        searchQuery={searchQuery}
        handleSearchQuery={handleSearchQuery}
      ></SearchBar>
    </div>
  );
}
