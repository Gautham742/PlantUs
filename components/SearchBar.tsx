"use client"
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search plants..."
      value={query}
      onChange={handleChange}
      className="border border-gray-300 mx-16 px-4 py-2 rounded-md focus:outline-none focus:border-green-50"
    />
  );
};

export default SearchBar;
