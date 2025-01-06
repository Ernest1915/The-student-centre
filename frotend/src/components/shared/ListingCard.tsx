interface CardProps {
  title: string;
  description: string;
  imageSrc: string;
  altText: string;
}

const ListingCard = ({ title, description, imageSrc, altText }: CardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
      <img
        src={imageSrc}
        alt={altText}
        className="w-full h-48 object-cover rounded-lg"
      />
      <h3 className="text-lg font-bold mt-4">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
};

export default ListingCard;
