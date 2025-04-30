import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Hostel {
  id: string;
  name: string;
  image: string;
  availability: boolean;
  description: string;
  price: string;
  location: string;
  amenities: string[];
}

function HostelDetails() {
  const { id } = useParams();
  const [hostel, setHostel] = useState<Hostel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHostel() {
      try {
        console.log(id)
        const res = await fetch(`http://localhost:8000/api/get_hostel/${id}`);
      
        const data = await res.json();
        console.log(data)
        setHostel(data);
      } catch (error) {
        console.error('Failed to fetch hostel:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchHostel();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!hostel) return <div className="text-center mt-10">Hostel not found.</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{hostel.name}</h1>
      <img
        src={hostel.image}
        alt={hostel.name}
        className="w-full h-64 object-cover rounded-md"
      />
      <p className="mt-4 text-lg">Location: {hostel.location}</p>
      <p className="text-lg">Price: UGX {hostel.price} / month</p>
      <p className="text-lg">Availability: {hostel.availability ? "Available" : "Not Available"}</p>
    </div>
  );
  
}

export default HostelDetails;
