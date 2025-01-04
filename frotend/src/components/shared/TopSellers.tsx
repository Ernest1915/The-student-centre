const TopSellers = () => {
  const topBuyers = [
    { name: "Alice", location: "A" },
    { name: "Bob", location: "A" },
    { name: "Carol", location: "B" },
    { name: "Dave", location: "C" },
    { name: "Eve", location: "B" },
  ];

  return (
    <div className=" p-4 bg-blue-500 rounded-lg shadow-lg text-gray-100">
      <h2 className="text-lg font-semibold mb-4">Top Buyers</h2>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-blue-300">
            <th className="p-2">Name</th>
            <th className="p-2">Account location</th>
          </tr>
        </thead>
        <tbody>
          {topBuyers.map((buyer, index) => (
            <tr key={index} className="border-b border-gray-800">
              <td className="p-2">{buyer.name}</td>
              <td className="p-2">{buyer.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopSellers;
