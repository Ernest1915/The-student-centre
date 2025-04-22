import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type CafeteriaCardProps = {
  cafe: {
    id: string;
    name: string;
    cuisine: string;
    price_range: string;
    rating: number;
    cafe_image: string;
  };
};

const CafeteriaCard = ({ cafe }: CafeteriaCardProps) => {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="p-0">
        <img
          src={cafe.cafe_image}
          alt={cafe.name}
          className="w-full h-40 object-cover rounded-t-md"
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg">{cafe.name}</CardTitle>
        <p className="text-sm text-gray-600 mt-1">Cuisine: {cafe.cuisine}</p>
        <p className="text-sm text-gray-600">Price: {cafe.price_range}</p>
        <p className="text-sm text-yellow-600 font-medium">Rating: {cafe.rating} ⭐</p>
      </CardContent>
    </Card>
  );
};

export default CafeteriaCard;
