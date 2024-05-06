"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import usePlacesAutocomplete from 'use-places-autocomplete';
import { Combobox } from '@reach/combobox';
import GoogleMapReact from 'google-map-react';
import NurseryCard from '@/components/NurseryCard';
import { getNurseriesFromFirebase } from '../firebase/config';
import { Nursery } from '@/constants/Index';
import CustomMarker from '@/components/CustomMarker'; // Import the custom marker component

const Main: React.FC = () => {
  const router = useRouter();
  const [nurseries, setNurseries] = useState<Nursery[]>([]);
  const [mapCenter, setMapCenter] = useState<[number, number]>([0, 0]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete();

  useEffect(() => {
    const fetchNurseries = async () => {
      try {
        const nurseriesData = await getNurseriesFromFirebase();
        setNurseries(nurseriesData);

        // Calculate map center based on average nursery location
        const totalLat = nurseriesData.reduce((acc, nursery) => acc + nursery.location.latitude, 0);
        const totalLng = nurseriesData.reduce((acc, nursery) => acc + nursery.location.longitude, 0);
        const avgLat = totalLat / nurseriesData.length;
        const avgLng = totalLng / nurseriesData.length;
        setMapCenter([avgLat, avgLng]);
      } catch (error) {
        console.error('Error fetching nurseries:', error);
      }
    };

    fetchNurseries();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    const filteredNurseries = nurseries.filter(nursery => nursery.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setNurseries(filteredNurseries);
  };

  const handleUserLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      });
    } else {
      alert('Geolocation is not supported in this browser.');
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className='text-center text-3xl font-bold my-6'>Nursery Locator</h2>
      {/* Search Bar */}
      <div className="relative flex flexbox items-center justify-center my-6">
        <Combobox aria-label="Search">
          <input
            className="border border-gray-300 rounded-md py-2 px-4 w-full"
            type="text"
            value={value}
            onChange={handleSearchChange}
            placeholder="Search for a nursery location..."
          />
        </Combobox>
        <p className='mx-2'>Or</p>
        <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none" onClick={handleUserLocation}>
          Use My Location
        </button>
      </div>
      
      {/* Google Map */}
      <div style={{ height: '400px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ 
            key: 'AIzaSyBAXqZV4e5oTPU1okohoph1tn97JDDsAus'
          }}
          defaultCenter={{ lat: mapCenter[0], lng: mapCenter[1] }}
          defaultZoom={12}
        >
          {userLocation && (
            <CustomMarker
              lat={userLocation[0]}
              lng={userLocation[1]}
              text="You are here"
            />
          )}
          {nurseries.map(nursery => (
            <CustomMarker
              key={nursery.id}
              lat={nursery.location.latitude}
              lng={nursery.location.longitude}
              text={nursery.name}
            />
          ))}
        </GoogleMapReact>
      </div>

      {/* Nursery Cards */}
      <div className="grid grid-cols-3 gap-6 mt-6">
        {nurseries.map(nursery => (
          <NurseryCard key={nursery.id} nursery={nursery} />
        ))}
      </div>
    </div>
  );
};

export default Main;
