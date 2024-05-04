import { useEffect, useState } from 'react';
import { getPlantsFromFirebase } from '@/app/firebase/config';
import { useRouter } from 'next/router';
import PlantDetails from '@/components/PlantDetails';
import { Plant } from '@/constants/Index';

interface PlantPageProps {
  plant: Plant | null;
}

const PlantPage: React.FC<PlantPageProps> = ({ plant }) => {
  return <PlantDetails plant={plant} />;
};

export default function PlantId() {
  const router = useRouter();
  const { plantId } = router.query;
  const [plant, setPlant] = useState<Plant | null>(null);

  useEffect(() => {
    if (plantId) {
      fetchPlantDetails(plantId as string);
    }
  }, [plantId]);

  const fetchPlantDetails = async (plantId: string) => {
    try {
      const plants = await getPlantsFromFirebase();
      const plant = plants.find((p) => p.id === plantId);
      setPlant(plant || null);
    } catch (error) {
      console.error('Error fetching plant details:', error);
    }
  };

  return <PlantPage plant={plant} />;
}