import HostelCard from "@/components/shared/HostelCard";
import Search from "@/components/shared/Search";
import TopSellers from "@/components/shared/TopSellers";

const Hostel = () => {
  return (
    <div className="flex flex-col w-full h-full bg-primary-500">
      <div className="p-6">
        <Search />
      </div>

      <div className="w-full flex flex-row h-1/3 mb-3">
        <div className="w-2/3 bg-[rgba(24,24,24,0.6)] p-6 rounded-lg shadow-lg ml-6">
          Hello
        </div>
        <div className="bg-[rgba(24,24,24,0.6)] p-6 rounded-lg shadow-lg ml-6 w-1/3 mr-3"></div>
      </div>
      <div className="w-full flex flex-row">
        <div className="w-2/3 bg-[rgba(24,24,24,0.6)] p-6 rounded-lg shadow-lg ml-6">
          <HostelCard />
        </div>
        <div className="ml-6">
          <TopSellers />
        </div>
      </div>
    </div>
  );
};

export default Hostel;
