// src/components/UniversityCard.tsx
import React from "react";
import { University } from "";

interface UniversityCardProps {
  university: University;
}

const UniversityCard: React.FC<UniversityCardProps> = ({ university }) => (
  <div className="university-card">
    <img src={university.logo} alt={`${university.name} logo`} />
    <h2>{university.name}</h2>
    <p>{university.description}</p>
  </div>
);

export default UniversityCard;
