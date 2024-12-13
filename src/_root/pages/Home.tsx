import Search from "@/components/shared/Search";

const Home = () => {
  return (
    <div className="bg-white w-full">
      <div className="p-6 flex justify-center">
        <Search />
      </div>

      <section className="text-center p-10 bg-blue-500 text-white">
        <h1 className="text-4xl font-bold">Welcome to Student Center</h1>
        <p className="mt-4 text-lg">
          Find the best hostels and cafeterias near your university with ease.
        </p>
      </section>
      {/* Featured Listings */}
      <section className="p-10 bg-white">
        <h2 className="text-2xl font-bold text-center mb-6">
          Featured Listings
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold">Hostel A</h3>
            <p className="mt-2">Affordable and near the main campus.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold">Cafeteria B</h3>
            <p className="mt-2">Great meals with student discounts.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold">Hostel C</h3>
            <p className="mt-2">Modern amenities and 24/7 security.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
