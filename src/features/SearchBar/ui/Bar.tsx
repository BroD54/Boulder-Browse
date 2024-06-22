import React from 'react';
import { useForm, Controller } from 'react-hook-form';

interface SearchFormData {
    searchQuery: string
}

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const Bar = ({ onSearch }: SearchBarProps) => {
  const { control, watch } = useForm<SearchFormData>();

  const searchQuery = watch('searchQuery', '');

  React.useEffect(() => {
    onSearch(searchQuery);
  }, [searchQuery, onSearch]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      className="absolute top-16 left-1/2 transform -translate-x-1/2 w-2/5 max-w-xl flex space-x-2 rounded-xl shadow-lg shadow-gray-500"
      onClick={handleClick}
    >
      <Controller
        name="searchQuery"
        control={control}
        
        defaultValue=""
        render={({ field }) => (
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl"
            placeholder="Search for a course..."
            autoComplete="off"
            {...field}
          />
        )}
      />
    </div>
  );
};

export default Bar;
