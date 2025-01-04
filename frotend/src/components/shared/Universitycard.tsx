import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { IUniversity } from "@/types";
import React from "react";

interface UniversityCardProps {
  university: IUniversity;
}

const Universitycard: React.FC<UniversityCardProps> = ({ university }) => {
  return (
    <Card className="m-5 w-[70vw] lg:w-[70vw] bg-[rgba(24,24,24,0.6)] p-6 rounded-lg shadow-lg">
      <img
        src={university.img}
        alt={university.name}
        className="h-40 w-full object-cover rounded-t-md"
      />

      <CardHeader>
        <CardTitle className="text-xl font-bold">{university.name}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-white">{university.description}</p>
      </CardContent>
    </Card>
  );
};

export default Universitycard;
