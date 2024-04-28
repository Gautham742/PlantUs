"use client"
import React, { useState } from 'react';

const Home: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [itemDetails, setItemDetails] = useState<any | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const identifyItem = async () => {
    // Here you can implement logic to identify the item using an API
    try {
      const response = await fetch('https://api.example.com/identify', {
        method: 'POST',
        body: JSON.stringify({ image: selectedFile }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setItemDetails(data);
    } catch (error) {
      console.error('Error identifying item:', error);
    }
  };

  return (
    <div className="container mx-auto mt-10 text-center">
      <h1 className="text-3xl font-bold mb-8">Upload and Identify Item</h1>
      <div
        className="border border-dashed border-gray-400 p-8 mb-8"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          id="fileInput"
        />
        <label htmlFor="fileInput" className="cursor-pointer">
          {selectedFile ? (
            <img src={URL.createObjectURL(selectedFile)} alt="Uploaded" className="max-w-full h-auto mb-4" />
          ) : (
            <div className="text-gray-500">
              <span className="text-xl">Drop or click to upload an image</span>
            </div>
          )}
        </label>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={identifyItem}
        disabled={!selectedFile}
      >
        Identify Item
      </button>
      {itemDetails && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Item Details</h2>
          <img src={itemDetails.imageUrl} alt={itemDetails.name} className="max-w-full h-auto mb-4" />
          <p className="text-lg">{itemDetails.name}</p>
          {/* Render other details as needed */}
        </div>
      )}
    </div>
  );
};

export default Home;
