"use client"
import { useState, useEffect } from 'react';
import PlantCard from '@/components/PlantCard';
import SearchBar from '@/components/SearchBar';
import { Plant } from '@/constants/Index';
import { getPlantsFromFirebase } from '../firebase/config';

const PlantsPage: React.FC = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    const fetchedPlants = await getPlantsFromFirebase();
    setPlants(fetchedPlants);
    setFilteredPlants(fetchedPlants);
  };

  const handleSearch = (query: string) => {
    const filtered = plants.filter((plant) =>
      plant.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPlants(filtered);
  };

  return (
    <div>
      <p className="text-center text-3xl font-bold my-6">Plants</p>
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPlants.map((plant) => (
          <PlantCard key={plant.id} plant={plant} />
        ))}
      </div>
    </div>
  );
};

export default PlantsPage;
