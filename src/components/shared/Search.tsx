import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Search = () => {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="input" placeholder="Search ..." />
      <Button type="submit" className="bg-blue-500">
        Search
      </Button>
    </div>
  );
};

export default Search;
