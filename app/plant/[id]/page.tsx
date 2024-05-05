"use client"
import { useEffect, useState } from 'react';
import { Plant } from '@/constants/Index';
import { getPlantsFromFirebase } from '@/app/firebase/config';

const PlantDetails: React.FC = () => {
  const [plant, setPlant] = useState<Plant | null>(null);

  useEffect(() => {
    const id = getIdFromPath();
    if (id) {
      fetchPlantDetails(id);
    }
  }, []);

  const getIdFromPath = () => {
    const path = window.location.pathname;
    // Assuming the path is like '/plant/id', split it and get the last part as the id
    const parts = path.split('/');
    return parts[parts.length - 1];
  };

  const fetchPlantDetails = async (plantId: string) => {
    try {
      const plants = await getPlantsFromFirebase();
      const plant = plants.find(p => p.id === plantId);
      setPlant(plant || null);
    } catch (error) {
      console.error('Error fetching plant details:', error);
    }
  };

  if (!plant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <div className="w-1/2 mr-8">
        {/* Display plant image */}
        <img src={plant.imageurl} alt={plant.name} className="w-full h-auto mb-4" />
        {/* Display plant common name */}
        <h2 className="text-2xl font-bold mb-2">{plant.name}</h2>
        {/* Display plant description */}
        <p className="text-gray-600 mb-4">{plant.description}</p>
      </div>
      <div className="w-1/2">
        {/* Display plant details */}
        <h3 className="text-lg font-bold mb-2">Plant Details</h3>
        <ul>
          <li><strong>Botanical Name:</strong> {plant.botanicalname}</li>
          <li><strong>Family:</strong> {plant.family}</li>
          <li><strong>Plant Type:</strong> {plant.planttype}</li>
          <li><strong>Mature Size:</strong> {plant.maturesize}</li>
          <li><strong>Temperature:</strong> {plant.temperature}</li>
          <li><strong>Sun Exposure:</strong> {plant.sunexposure}</li>
          <li><strong>Water:</strong> {plant.water}</li>
          <li><strong>Soil Type:</strong> {plant.soiltype}</li>
          <li><strong>Fertilizer:</strong> {plant.fertilizer}</li>
          <li><strong>Soil pH:</strong> {plant.soilph}</li>
          <li><strong>Bloom Time:</strong> {plant.bloomtime}</li>
          <li><strong>Flower Color:</strong> {plant.flowercolor}</li>
        </ul>
      </div>
    </div>
  );
};

export default PlantDetails;
