import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type HostelCardProps = {
  hostel: {
    id: string;
    Name: string;
    Availability: boolean;
    package: string;
  };
};

const HostelCard = ({ hostel }: HostelCardProps) => {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle>{hostel.Name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p
          className={`text-sm font-medium ${
            hostel.Availability ? "text-green-600" : "text-red-500"
          }`}
        >
          {hostel.Availability ? "Available" : "Not Available"}
        </p>
        <p className="mt-2 font-bold text-gray-800">Package: {hostel.package}</p>
      </CardContent>
    </Card>
  );
};

export default HostelCard;
