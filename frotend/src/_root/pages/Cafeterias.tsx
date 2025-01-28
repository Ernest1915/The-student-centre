import { useState } from "react";
import { databases, account, appwriteConfig } from "@/lib/appwrite/config";
import { useNavigate } from "react-router-dom";
import { ICafeteria, Meal } from "@/types/index";
import axios from "axios";

const Cafeteria = () => {
  const [selectedCafeteria, setSelectedCafeteria] = useState<ICafeteria | null>(null);
  const [loading, setLoading] = useState(false); // Button/loading state
  const navigate = useNavigate();

  // Sample data for cafeterias
  const cafeterias: ICafeteria[] = [
    {
      id: 1,
      name: "Campus Cafeteria",
      cuisine: "Local Dishes",
      priceRange: "$$",
      rating: 4.5,
      image: "https://via.placeholder.com/300",
      meals: [
        { id: 1, name: "Chicken Curry", price: 7.5 },
        { id: 2, name: "Vegetable Stir Fry", price: 6.0 },
      ],
    },
    {
      id: 2,
      name: "Uptown Cafeteria",
      cuisine: "International",
      priceRange: "$$$",
      rating: 4.8,
      image: "https://via.placeholder.com/300",
      meals: [
        { id: 3, name: "Beef Steak", price: 12.0 },
        { id: 4, name: "Caesar Salad", price: 8.0 },
      ],
    },
  ];

  const openCafeteria = (cafeteria: ICafeteria) => setSelectedCafeteria(cafeteria);

  const closeCafeteria = () => setSelectedCafeteria(null);

  const handleOrder = async (meal: Meal) => {
    try {
      setLoading(true);

      if (!selectedCafeteria) {
        alert("Please select a cafeteria before placing an order.");
        setLoading(false);
        return;
      }

      const user = await account.get();

      const orderData = {
        mealId: meal.id,
        cafeteriaId: selectedCafeteria.id,
        userId: user.$id,
        quantity: 1,
        status: "pending",
      };

      await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.OrdersCollectionId,
        "unique()",
        orderData
      );

      alert("Your order has been successfully placed!");
      setLoading(false);
      navigate("/order-confirmation");
    } catch (error) {
      console.error("Error placing order: ", error);
      alert("Failed to place order. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Cafeterias</h1>

      {!selectedCafeteria ? (
        <div className="flex flex-wrap gap-6">
          {cafeterias.map((cafeteria) => (
            <div
              key={cafeteria.id}
              className="flex flex-col items-center bg-white shadow-md rounded-lg p-4 w-72"
            >
              <img
                src={cafeteria.image}
                alt={cafeteria.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold">{cafeteria.name}</h2>
              <p className="text-gray-500">{cafeteria.cuisine}</p>
              <p className="text-gray-700">Price Range: {cafeteria.priceRange}</p>
              <p className="text-yellow-500">Rating: ⭐ {cafeteria.rating}</p>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4"
                onClick={() => openCafeteria(cafeteria)}
              >
                View Meals
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded mb-4"
            onClick={closeCafeteria}
          >
            Back to Cafeterias
          </button>
          <h2 className="text-2xl font-bold mb-4">{selectedCafeteria.name}</h2>
          <div className="text-gray-500 mb-6">
            <p>Cuisine: {selectedCafeteria.cuisine}</p>
            <p>Price Range: {selectedCafeteria.priceRange}</p>
            <p>Rating: ⭐ {selectedCafeteria.rating}</p>
          </div>

          <div className="flex flex-wrap gap-6">
            {selectedCafeteria.meals.map((meal) => (
              <div
                key={meal.id}
                className="flex flex-col items-center bg-white shadow-md rounded-lg p-4 w-64"
              >
                <h4 className="text-lg font-semibold mb-2">{meal.name}</h4>
                <p className="text-gray-700 mb-4">Price: ${meal.price.toFixed(2)}</p>
                <button
                  className={`${
                    loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                  } text-white px-4 py-2 rounded`}
                  onClick={() => handleOrder(meal)}
                  disabled={loading}
                >
                  {loading ? "Placing Order..." : "Order Now"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cafeteria;
