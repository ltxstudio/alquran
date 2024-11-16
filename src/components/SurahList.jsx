import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const SurahList = () => {
  const [surahs, setSurahs] = useState([]);
  const [filteredSurahs, setFilteredSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios
      .get('https://api.alquran.cloud/v1/surah')
      .then((response) => {
        setSurahs(response.data.data);
        setFilteredSurahs(response.data.data);  // Initialize filteredSurahs with all surahs
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter surahs based on the search query
    const filtered = surahs.filter((surah) => 
      surah.englishName.toLowerCase().includes(query) ||
      surah.englishNameTranslation.toLowerCase().includes(query)
    );
    setFilteredSurahs(filtered);
  };

  if (loading) return <p className="text-center text-lg">Loading Surahs...</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-extrabold text-center mb-8 text-gradient"
      >
        Surah List
      </motion.h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search Surahs"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out hover:ring-blue-400"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredSurahs.map((surah) => (
          <motion.div
            key={surah.number}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-teal-500 via-blue-500 to-purple-600 p-4 rounded-lg shadow-lg text-white transform transition-all duration-300 ease-in-out hover:shadow-xl"
          >
            <Link to={`/surah/${surah.number}`} className="block text-center">
              <h2 className="text-2xl font-bold mb-2">{surah.englishName}</h2>
              <p className="text-sm italic mb-2">{surah.englishNameTranslation}</p>
              <p className="text-lg mt-2">Surah {surah.number}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SurahList;
