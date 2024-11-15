import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const SurahList = () => {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://api.alquran.cloud/v1/surah')
      .then((response) => {
        setSurahs(response.data.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  if (loading) return <p className="text-center text-lg">Loading Surahs...</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-extrabold text-center mb-8"
      >
        Surah List
      </motion.h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {surahs.map((surah) => (
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
    </div>
  );
};

export default SurahList;
