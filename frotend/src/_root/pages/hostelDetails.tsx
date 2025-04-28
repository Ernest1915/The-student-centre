import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Hostel {
  id: string;
  name: string;
  image: string;
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
    <div className="max-w-4xl mx-auto p-6">
      <img src={hostel.image} alt={hostel.name} className="w-full h-64 object-cover rounded-2xl shadow-md" />
      <h1 className="text-3xl font-bold mt-4">{hostel.name}</h1>
      <p className="text-gray-500 mt-2">{hostel.location}</p>
      <p className="text-xl font-semibold text-green-600 mt-4">UGX {hostel.price} / month</p>
      <p className="mt-4 text-gray-700">{hostel.description}</p>

      <h2 className="text-xl font-semibold mt-6">Amenities</h2>
      <ul className="list-disc list-inside text-gray-600">
        {hostel.amenities.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default HostelDetails;
