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

  const removeImage = () => {
    setSelectedFile(null);
  };

  const identifyItem = async () => {
    if (!selectedFile) return; // Check if a file is selected
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      const response = await fetch('https://api.example.com/identify', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setItemDetails(data);
    } catch (error) {
      console.error('Error identifying item:', error);
    }
  };

  return (
    <div className="container mx-auto mt-10 mb-10 text-center">
      <h1 className="text-3xl font-bold mb-8">Upload and Identify Item</h1>
      <div
        className="border-2 border-dashed border-gray-400 hover:border-gray-700 p-8 mb-8 mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32 relative flex items-center justify-center"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {selectedFile && (
          <>
            <button
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              onClick={removeImage}
            >
              X
            </button>
            <div className="flex flex-col items-center">
              <img src={URL.createObjectURL(selectedFile)} alt="Uploaded" className="max-w-full h-auto mb-4" />
              <span className="block mt-4">Uploaded Image</span>
            </div>
          </>
        )}
        {!selectedFile && (
          <label htmlFor="fileInput" className="cursor-pointer">
            <div className="text-gray-500 mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32">
              <img src="upload.svg" alt="upload" className=" mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32 w-36" />
              <span className="block mt-4">Drop or click to upload an image</span>
            </div>
          </label>
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          id="fileInput"
        />
      </div>
      <button
        className="border-green-50 bg-green-50 hover:bg-green-700 delay-150 text-white font-bold py-2 px-4 rounded"
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
