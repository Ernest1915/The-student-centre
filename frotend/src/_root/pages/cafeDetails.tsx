import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ICafeteria } from "@/types"; 
import axios from "axios";

const CafeteriaDetails = () => {
  const { id } = useParams<{ id: string }>();

  const [cafe, setCafe] = useState<ICafeteria | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchCafeteria = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/get_cafe/${id}/`);
        setCafe(response.data);
      } catch (error) {
        console.error("Error fetching cafeteria details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCafeteria();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!cafe) return <p>Cafeteria not found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{cafe.name}</h1>
      <img src={cafe.cafe_image} alt={cafe.name} className="w-full h-64 object-cover rounded-md" />
      <p className="mt-4 text-lg">Cuisine: {cafe.cuisine}</p>
      <p className="text-lg">Price Range: {cafe.price_range}</p>
      <p className="text-lg">Rating: {cafe.rating} ⭐</p>
    </div>
  );
};

export default CafeteriaDetails;
