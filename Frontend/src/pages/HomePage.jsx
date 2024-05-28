import SearchBar from "@/components/searchBar/SearchBar";

const HomePage = () => {
  return (
    <div className="flex h-full items-center gap-8">
      <div className="flex flex-3 p-8">
        <div className="flex flex-col justify-center gap-12 h-full">
          <h1 className="text-4xl lg:text-5xl">
            Find Real Estate & Get Your Dream Place
          </h1>
          <p className="text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
            explicabo suscipit cum eius, iure est nulla animi consequatur
            facilis id pariatur fugit quos laudantium temporibus dolor ea
            repellat provident impedit!
          </p>
          <SearchBar />
          <div className="flex justify-between gap-6">
            <div className="flex flex-col items-start">
              <span className="text-2xl font-bold">16+</span>
              <span className="text-sm w-full">Years of Experience</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-2xl font-bold">200</span>
              <span className="text-sm">Award Gained</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-2xl font-bold">2000+</span>
              <span className="text-sm">Property Ready</span>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex flex-2 relative items-center">
        <img
          src="/bg.png"
          alt="background"
          className="w-[115%] lg:w-[105%] absolute right-0"
        />
      </div>
    </div>
  );
};

export default HomePage;
