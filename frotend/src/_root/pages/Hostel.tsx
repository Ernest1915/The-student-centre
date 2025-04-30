import { useEffect, useState } from "react";
import HostelCard from "@/components/shared/HostelCard";
import Search from "@/components/shared/Search";
import { HostelType } from "@/types";
import { Link } from "react-router-dom";



const Hostel = () => {
  const [hostels, setHostels] = useState<HostelType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/get_Hostels/");
        const data = await res.json();
        console.log(data)
        setHostels(data || []);

        console.log(data)
      } catch (err) {
        console.error("Failed to fetch hostels", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHostels();
  }, []);

  return (
    <div className="w-full min-h-screen bg-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <Search />

        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          Explore Hostels
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {hostels.map((hostel) => (
              <Link key={hostel.id} to={`/hostel/${hostel.id}`}>
                <HostelCard hostel={hostel} />
              </Link>
            ))}
          </div>

        )}
      </div>
    </div>
  );
};

export default Hostel;
