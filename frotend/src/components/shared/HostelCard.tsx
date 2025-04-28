import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { IHostel } from "@/types";
import { useState } from "react";
import { Link } from "react-router-dom";


const HostelCard = () => {

  const [hostel, setHostel] = useState<IHostel[]>([])
  return (
    <Link to={`/hostel/${hostel.$id}`}>
      <Card className="transition-shadow hover:shadow-md cursor-pointer">
        <CardHeader>
          <CardTitle>{hostel.name}</CardTitle>
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
    </Link>
  );
};

export default HostelCard;
