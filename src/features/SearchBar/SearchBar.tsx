import React, { useState, useCallback, useEffect } from 'react';
import filterJson from './utils/Filter';
import Bar from './ui/Bar';
import Results from './ui/Results';
import data from '../../data/mock/2021Fall-2024Fall.json';

const courses: Courses = data;

const SearchBar = () => {
    const [results, setResults] = useState<Course[]>([]);
    const [query, setQuery] = useState<string>('');
    const [showResults, setShowResults] = useState(true)

    const handleSearch = useCallback((searchQuery: string) => {
        setQuery(searchQuery);
    }, []);

    useEffect(() => {
        if (query.length > 3) {
            const queryResults = filterJson<Course>({ data: courses.results, fields: ['title', 'code'], search: query });
            setResults(queryResults);
        } else {
            setResults([]);
        }
    }, [query]);

    return (
        <>
            <Bar onSearch={handleSearch} setShowResults={setShowResults}/> 
            {showResults && <Results results={results} />}
        </>
    );
};

export default SearchBar;
