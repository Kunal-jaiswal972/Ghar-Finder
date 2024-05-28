import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col justify-center items-center h-full w-full">
      <Oval width="200" color="#000" secondaryColor="#fff" />
      <div className="text-md">Loading please wait...</div>
    </div>
  );
};

export default Loader;
