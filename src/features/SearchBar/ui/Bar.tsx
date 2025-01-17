import { Dispatch, SetStateAction, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelectedCourse } from '../../../context/SelectedCourseContext';
import useDelayedEffect from '../../../hooks/useDelayedEffect';

interface SearchFormData {
    searchQuery: string
}

interface SearchBarProps {
  onSearch: (query: string) => void;
  setShowResults: Dispatch<SetStateAction<boolean>>
}

const Bar = ({ onSearch, setShowResults }: SearchBarProps) => {
  const { control, watch, setValue } = useForm<SearchFormData>();

  // clear search bar
  const { addCourse } = useSelectedCourse();
  useDelayedEffect(() => {
    if (addCourse != undefined) {
      setValue('searchQuery', '');
    }
  }, [addCourse]);

  const searchQuery = watch('searchQuery', '');

  useEffect(() => {
    onSearch(searchQuery);
  }, [searchQuery, onSearch]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setShowResults(true)
  };

  return (
    <div
      className="absolute top-16 left-1/2 transform -translate-x-1/2 w-2/5 max-w-xl flex space-x-2 rounded-xl shadow-lg shadow-gray-500"
      onClick={handleClick}
      onBlur={() => setTimeout(() => setShowResults(false), 50)}
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
