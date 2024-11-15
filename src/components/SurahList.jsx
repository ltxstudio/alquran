import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SearchBar from './SearchBar';

const SurahList = () => {
  const [surahs, setSurahs] = useState([]);
  const [filteredSurahs, setFilteredSurahs] = useState([]);

  useEffect(() => {
    axios.get('https://api.alquran.cloud/v1/surah')
      .then((response) => {
        setSurahs(response.data.data);
        setFilteredSurahs(response.data.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSearch = (query) => {
    setFilteredSurahs(
      surahs.filter((surah) =>
        surah.englishName.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Al-Quran Surah List</h1>
      <SearchBar onSearch={handleSearch} />
      <motion.ul
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
        }}
      >
        {filteredSurahs.map((surah) => (
          <motion.li
            key={surah.number}
            className="p-4 border rounded-lg shadow hover:shadow-lg transition-shadow"
            whileHover={{ scale: 1.05 }}
          >
            <Link to={`/surah/${surah.number}`} className="block">
              <h2 className="text-xl font-semibold">{surah.englishName}</h2>
              <p className="text-sm text-gray-500">{surah.englishNameTranslation}</p>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default SurahList;
