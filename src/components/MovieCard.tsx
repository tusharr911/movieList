const MovieCard = () => {
  return (
    <div className="shadow-xl py-2 px-2 flex flex-col gap-2 rounded-lg hover:shadow-2xl cursor-pointer transition-transform duration-300">
      <div className="h-68 w-full overflow-hidden rounded-md">
        <img src="" alt="" className="h-full w-full object-cover object-top" />
      </div>
      <div className="flex flex-col justify-between flex-grow">
        <div className="flex items-center justify-between font-semibold">
          <p className="text-lg">title</p>
          <p className="text-sm">year</p>
        </div>
        <button
          className="bg-zinc-800 text-white w-full py-2 rounded-md hover:bg-white hover:text-black transition-all hover:ring-1 ring-black mt-2"
          onClick={}
        >
          Add to Watchlist
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
