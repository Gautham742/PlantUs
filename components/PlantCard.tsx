import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LimitedParagraph from './LimitedParagraph';
import { Plant } from '../constants/Index';

interface PlantCardProps {
  plant: Plant;
}
const PlantCard: React.FC<PlantCardProps> = ({ plant }) => {
  return (
    <div className="bg-white shadow-md mx-8 my-6 rounded-lg p-4">
      <div className="relative w-full h-48 my-4">
        <Image src={plant.imageurl} alt={plant.name} layout="fill" objectFit="cover" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{plant.name}</h3>
      <LimitedParagraph content={plant.description} limit={20} />
      <Link href={`/plant/${plant.id}`}> {/* Update href to include plant ID */}
        <button className="bg-blue-500 hover:bg-blue-600 text-white mt-4 py-2 px-4 rounded focus:outline-none">
          View Details
        </button>
      </Link>
    </div>
  );
};

export default PlantCard;
