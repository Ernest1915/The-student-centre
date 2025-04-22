import { useEffect, useState } from "react";
import { ICafeteria } from "@/types/index";
import axios from "axios";
import CafeteriaCard from "@/components/shared/cafeteriaCard";

const Cafeterias = () => {
  const [cafeterias, setCafeterias] = useState<ICafeteria[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCafeterias = async () => {
      try {
        console.log("connecting ...")
        const response = await axios.get("http://localhost:8000/api/get_cafes/");
        console.log(response)
        setCafeterias(response.data);
      } catch (error) {
        console.error("Failed to fetch cafeterias:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCafeterias();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Cafeterias</h1>

      {loading ? (
        <p className="text-gray-600">Loading cafeterias...</p>
      ) : cafeterias.length === 0 ? (
        <p className="text-gray-600">No cafeterias available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cafeterias.map((cafe) => (
            <CafeteriaCard key={cafe.id} cafe={cafe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Cafeterias;
