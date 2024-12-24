import { useEffect, useState } from "react";
import { databases, databaseId, cafeteriasCollectionId } from"../appwrite.config";// I am trying to  use this to connect  the appwrite then later transfer it to cafeterias page 
//but issues in finding the file 

const Cafeterias = () => {
  const [cafeterias, setCafeterias] = useState([]);

  useEffect(() => {
    const fetchCafeterias = async () => {
      try {
        const response = await databases.listDocuments(databaseId, cafeteriasCollectionId);
        setCafeterias(response.documents);
      } catch (error) {
        console.error("Error fetching cafeterias:", error);
      }
    };

    fetchCafeterias();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cafeterias.map((cafeteria) => (
        <div
          key={cafeteria.$id}
          className="bg-white rounded-lg shadow-md p-4 flex flex-col"
        >
          <img
            src={cafeteria.image}
            alt={cafeteria.name}
            className="w-full h-40 object-cover rounded-t-md"
          />
          <div className="p-2">
            <h2 className="text-xl font-semibold">{cafeteria.name}</h2>
            <p className="text-gray-600">{cafeteria.cuisine}</p>
            <p className="text-gray-800 font-bold">{cafeteria.priceRange}</p>
            <p className="text-yellow-500 font-medium">{cafeteria.rating} ⭐</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cafeterias;
