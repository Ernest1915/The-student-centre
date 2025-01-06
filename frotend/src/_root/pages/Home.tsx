import ListingCard from "@/components/shared/ListingCard";
import Search from "@/components/shared/Search";

const Home = () => {
  const listings = [
    {
      title: "Hostel A",
      description: "Affordable and near the main campus.",
      imageSrc: "/assets/images/hostel-a.jpg",
      altText: "Hostel A",
    },
    {
      title: "Cafeteria B",
      description: "Great meals with student discounts.",
      imageSrc: "/assets/images/cafeteria-b.jpg",
      altText: "Cafeteria B",
    },
    {
      title: "Hostel C",
      description: "Modern amenities and 24/7 security.",
      imageSrc: "/assets/images/hostel-c.jpg",
      altText: "Hostel C",
    },
  ];
  return (
    <div className="bg-white w-full">
      {/* Search Bar */}
      <div className="p-6 flex justify-center">
        <Search />
      </div>

      {/* Hero Section */}
      <section
        className="relative text-center p-10 text-white bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/images/hero-bg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-blue-500 "></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold drop-shadow-lg">
            Welcome to Student Center
          </h1>
          <p className="mt-4 text-xl">
            Find the best hostels and cafeterias near your university with ease.
          </p>
          <button className="mt-6 px-6 py-3 bg-white text-blue-500 font-bold rounded-lg shadow hover:bg-blue-100 transition">
            Get Started
          </button>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="p-10 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Listings
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Listing 1 */}
          {listings.map((listing, index) => (
            <ListingCard
              key={index}
              title={listing.title}
              description={listing.description}
              imageSrc={listing.imageSrc}
              altText={listing.altText}
            />
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="p-6 bg-blue-500 text-white">
        <div className="text-center">
          <p className="text-sm">© 2025 Student Center. All rights reserved.</p>
          <div className="flex justify-center mt-4 space-x-4">
            <a href="#" className="hover:text-blue-300">
              About Us
            </a>
            <a href="#" className="hover:text-blue-300">
              Contact
            </a>
            <a href="#" className="hover:text-blue-300">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
