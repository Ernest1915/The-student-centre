import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HostelCard = () => {
  const hostels = [
    {
      image: "",
      name: "A",
      desc: "",
    },
    {
      image: "",
      name: "B",
      desc: "",
    },
    {
      image: "",
      name: "C",
      desc: "",
    },
    // Add more dummy hostels as needed
  ];

  return (
    <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2">
      {hostels.map((htl, index) => (
        <Card
          key={index}
          className="bg-blue-500 p-4 rounded-lg shadow-lg text-gray-100"
        >
          <CardHeader className="flex flex-col items-start">
            <CardTitle className="text-sm font-semibold">{htl.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              <strong>Image:</strong> {htl.image}
            </p>
            <p className="text-sm">
              <strong>Desc:</strong> {htl.desc}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default HostelCard;
