import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useLocalStorage } from '../hooks/useLocalStorage'; // Custom hook for dark mode
import { RefreshIcon } from '@heroicons/react/24/solid'; // A loading spinner icon from HeroIcons

const SurahList = () => {
  const [surahs, setSurahs] = useState([]);
  const [filteredSurahs, setFilteredSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [surahsPerPage] = useState(10); // You can adjust this value to change the number of surahs per page
  const [sortOrder, setSortOrder] = useState('asc');
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);

  useEffect(() => {
    axios
      .get('https://api.alquran.cloud/v1/surah')
      .then((response) => {
        setSurahs(response.data.data);
        setFilteredSurahs(response.data.data); // Initialize filteredSurahs with all surahs
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = surahs.filter(
      (surah) =>
        surah.englishName.toLowerCase().includes(query) ||
        surah.englishNameTranslation.toLowerCase().includes(query) ||
        surah.number.toString().includes(query) // Search by number as well
    );
    setFilteredSurahs(filtered);
  };

  const handleSort = () => {
    const sorted = [...filteredSurahs].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.englishName.localeCompare(b.englishName);
      } else {
        return b.englishName.localeCompare(a.englishName);
      }
    });
    setFilteredSurahs(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const paginateSurahs = () => {
    const startIndex = (page - 1) * surahsPerPage;
    const endIndex = startIndex + surahsPerPage;
    return filteredSurahs.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredSurahs.length / surahsPerPage);

  if (loading) return <div className="text-center text-lg"><RefreshIcon className="animate-spin w-10 h-10 mx-auto text-blue-500" /></div>;

  return (
    <div className={`container mx-auto px-4 py-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      <div className="sticky top-0 bg-opacity-90 bg-white dark:bg-gray-900 p-4 rounded-lg mb-6 shadow-md z-10">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold text-center mb-4"
        >
          Surah List
        </motion.h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search Surahs (by name or number)"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        <div className="flex justify-between items-center mb-4">
          {/* Sort Button */}
          <button
            onClick={handleSort}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
          >
            Sort by Name ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg shadow-md hover:bg-gray-400 focus:outline-none"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>

      {/* Surah Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginateSurahs().map((surah) => (
          <motion.div
            key={surah.number}
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 rounded-lg shadow-lg text-white"
          >
            <Link to={`/surah/${surah.number}`} className="block text-center">
              <h2 className="text-2xl font-bold">{surah.englishName}</h2>
              <p className="text-sm italic">{surah.englishNameTranslation}</p>
              <p className="text-lg mt-2">Surah {surah.number}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg shadow-md hover:bg-gray-400 focus:outline-none disabled:opacity-50"
        >
          Previous
        </button>
        <span className="mx-4 text-lg">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg shadow-md hover:bg-gray-400 focus:outline-none disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SurahList;
