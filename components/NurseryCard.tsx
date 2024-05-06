import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Nursery } from '../constants/Index';

interface NurseryCardProps {
  nursery: Nursery;
}

const NurseryCard: React.FC<NurseryCardProps> = ({ nursery }) => {
  return (
    <div className="bg-white shadow-md mx-8 my-6 rounded-lg p-4">
      <div className="relative w-full h-48 my-4">
        <Image src={nursery.imageurl} alt={nursery.name} layout="fill" objectFit="cover" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{nursery.name}</h3>
      <p className="text-gray-600 mb-2">{nursery.place}</p>
      <Link href={`/nursery/${nursery.id}`}>
        <button className="bg-blue-500 hover:bg-blue-600 text-white mt-4 py-2 px-4 rounded focus:outline-none">
          View Details
        </button>
      </Link>
    </div>
  );
};

export default NurseryCard;
