"we are going to think more about this but this a results page that loads when a user searches for a university its specific to the particular university "
// src/pages/ResultsPage.tsx
import React, { useState, useEffect } from "react";
import UniversityCard from "../components/UniversityCard";
import { University } from "../types";

interface ResultsPageProps {
  searchQuery: string;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ searchQuery }) => {
  const [university, setUniversity] = useState<University | null>(null);

  useEffect(() => {
    // Replace this mock function with an actual API call
    const fetchUniversityDetails = async (query: string): Promise<University> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: 1,
            name: "Example University",
            logo: "/path/to/logo.png",
            description: "Example University is known for its excellent programs.",
          });
        }, 1000);
      });
    };

    fetchUniversityDetails(searchQuery).then((data) => setUniversity(data));
  }, [searchQuery]);

  if (!university) {
    return <p>Loading...</p>;
  }

  return (
    <div className="results-page">
      <h1>Results for "{searchQuery}"</h1>

      {/* Display university details */}
      <UniversityCard university={university} />

      {/* Links to hostels and cafeterias */}
      <div className="university-links">
        <a href={`/hostels/${university.id}`}>View Hostels</a>
        <a href={`/cafeterias/${university.id}`}>View Cafeterias</a>
      </div>
    </div>
  );
};

export default ResultsPage;
