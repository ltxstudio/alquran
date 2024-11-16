import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AudioPlayer from './AudioPlayer';
import { BookmarkIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { useBookmarks } from '../hooks/useBookmarks';

const SurahDetails = () => {
  const { number } = useParams();
  const [surah, setSurah] = useState(null);
  const [loading, setLoading] = useState(true);
  const [translations, setTranslations] = useState([]);
  const [selectedTranslation, setSelectedTranslation] = useState('en.asad');
  const { addBookmark } = useBookmarks();

  useEffect(() => {
    axios
      .get('https://api.alquran.cloud/v1/edition/type/translation')
      .then((response) => {
        setTranslations(response.data.data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          axios.get(`https://api.alquran.cloud/v1/surah/${number}/quran-simple`),
          axios.get(`https://api.alquran.cloud/v1/surah/${number}/${selectedTranslation}`),
          axios.get(`https://api.alquran.cloud/v1/surah/${number}/ar.alafasy`)
        ]);

        setSurah({
          arabic: responses[0].data.data,
          translation: responses[1].data.data,
          audio: responses[2].data.data,
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [number, selectedTranslation]);

  if (loading) return (
    <div className="text-center py-12">
      <svg className="animate-spin h-8 w-8 text-indigo-600 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.2" />
        <path d="M4 12a8 8 0 0 1 8-8v4l4-4-4-4v4a12 12 0 0 0 0 16v-4l-4 4 4 4v-4a8 8 0 0 1-8-8z" />
      </svg>
      <p className="text-lg text-gray-500 mt-4">Loading...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-6">
      <motion.article
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <header className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white leading-tight">{surah.translation.name}</h1>
            <p className="text-sm md:text-base text-gray-500 mt-2">{surah.translation.englishNameTranslation}</p>
          </div>
          <button
            onClick={() => addBookmark({ id: surah.arabic.number, text: surah.translation.name })}
            className="mt-4 md:mt-0 p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-blue-500 dark:hover:bg-blue-700 transition"
          >
            <BookmarkIcon className="w-6 h-6 text-blue-500" />
          </button>
        </header>

        <div className="mb-8">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Select Translation:</label>
          <select
            value={selectedTranslation}
            onChange={(e) => setSelectedTranslation(e.target.value)}
            className="block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500"
          >
            {translations.map((translation) => (
              <option key={translation.identifier} value={translation.identifier}>
                {translation.englishName} ({translation.language})
              </option>
            ))}
          </select>
        </div>

        <ol className="space-y-8">
          {surah.arabic.ayahs.map((ayah, index) => (
            <li key={ayah.number} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <div className="md:w-1/3 text-right">
                  <p className="text-2xl md:text-3xl font-arabic" style={{ fontFamily: `'Amiri Quran', serif` }}>
                    {ayah.text}
                  </p>
                </div>
                <div className="md:w-2/3 md:ml-6 mt-4 md:mt-0">
                  <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">{surah.translation.ayahs[index].text}</p>
                  <AudioPlayer audioUrl={surah.audio.ayahs[index].audio} />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </motion.article>
    </div>
  );
};

export default SurahDetails;
