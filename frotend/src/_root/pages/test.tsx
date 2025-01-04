import Search from "@/components/shared/Search";

const Cafeteria = () => {
  // We shall fix this with data from the data base check the restaurants card in components 
  const cafeterias = [
    {
      id: 1,
      name: "Campus Cafeteria",
      cuisine: "Local Dishes",
      priceRange: "$$",
      rating: 4.5,
      image: "https://via.placeholder.com/300",
    },
    {
      id: 2,
      name: "Food Court Express",
      cuisine: "Fast Food",
      priceRange: "$",
      rating: 4.2,
      image: "https://via.placeholder.com/300",
    },
    {
      id: 3,
      name: "Healthy Bites",
      cuisine: "Vegetarian",
      priceRange: "$$$",
      rating: 4.8,
      image: "https://via.placeholder.com/300",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-xl font-bold">Cafeterias</h1>
          <Search />
        </div>
      </header>

      {/* Filters Section */}
      <section className="container mx-auto px-4 py-6">
        <h2 className="text-lg font-semibold mb-4">Filter by</h2>
        <div className="flex space-x-4">
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 w-1/3"
            defaultValue=""
          >
            <option value="" disabled>
              Cuisine
            </option>
            <option>Local Dishes</option>
            <option>Fast Food</option>
            <option>Vegetarian</option>
          </select>
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 w-1/3"
            defaultValue=""
          >
            <option value="" disabled>
              Price Range
            </option>
            <option>$</option>
            <option>$$</option>
            <option>$$$</option>
          </select>
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 w-1/3"
            defaultValue=""
          >
            <option value="" disabled>
              Rating
            </option>
            <option>4.0+</option>
            <option>4.5+</option>
            <option>5.0</option>
          </select>
        </div>
      </section>

      {/* Cafeterias List */}
      <section className="container mx-auto px-4 py-6">
        <h2 className="text-lg font-semibold mb-4">Available Cafeterias</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cafeterias.map((cafeteria) => (
            <div
              key={cafeteria.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={cafeteria.image}
                alt={cafeteria.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{cafeteria.name}</h3>
                <p className="text-gray-600">{cafeteria.cuisine}</p>
                <p className="text-green-600 font-bold">{cafeteria.priceRange}</p>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-400 text-lg">★</span>
                  <span className="ml-1">{cafeteria.rating}</span>
                </div>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg w-full">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Cafeteria;
