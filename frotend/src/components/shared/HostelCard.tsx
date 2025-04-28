import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { HostelType } from "@/types";


interface HostelCardProps {
  hostel: HostelType;
}


const HostelCard = ({hostel}: HostelCardProps) => {

  console.log(hostel.id)
  return (

      <Card className="transition-shadow hover:shadow-md cursor-pointer">
        <CardHeader>
          <CardTitle>{hostel.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p
            className={`text-sm font-medium ${
              hostel.availability ? "text-green-600" : "text-red-500"
            }`}
          >
            {hostel.availability ? "Available" : "Not Available"}
          </p>
          <p className="mt-2 font-bold text-gray-800">Package: {hostel.package}</p>
        </CardContent>
      </Card>

  );
};

export default HostelCard;
