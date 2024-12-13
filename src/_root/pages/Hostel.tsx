import HostelCard from "@/components/shared/HostelCard";
import Search from "@/components/shared/Search";
import TopSellers from "@/components/shared/TopSellers";

const Hostel = () => {
  return (
    <div className="flex flex-col w-full h-full bg-white">
      <div className="p-6 flex justify-center">
        <Search />
      </div>
      <div className="flex flex-row w-full">
        <div className="w-2/3 flex flex-col h-full mb-3">
          <div className="flex-grow-[2] flex-shrink-0 flex-basis-2/3 bg-gray-100 p-6 rounded-lg shadow-lg m-3">
            Hello
          </div>

          <div className="flex-grow-[1] flex-shrink-0 flex-basis-1/3 bg-gray-100 p-6 rounded-lg shadow-lg m-3">
            <HostelCard />
          </div>
        </div>

        <div className="m-3">
          <TopSellers />
        </div>
      </div>
    </div>
  );
};

export default Hostel;
