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

  if (loading) return <p className="text-center text-lg">Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <motion.article
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg"
      >
        <header className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold">{surah.translation.name}</h1>
            <p className="text-sm text-gray-500">{surah.translation.englishNameTranslation}</p>
          </div>
          <button
            onClick={() => addBookmark({ id: surah.arabic.number, text: surah.translation.name })}
            className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full"
          >
            <BookmarkIcon className="w-6 h-6 text-blue-500" />
          </button>
        </header>

        <div className="mb-4">
          <label className="text-sm font-medium">Select Translation:</label>
          <select
            value={selectedTranslation}
            onChange={(e) => setSelectedTranslation(e.target.value)}
            className="ml-2 p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
          >
            {translations.map((translation) => (
              <option key={translation.identifier} value={translation.identifier}>
                {translation.englishName} ({translation.language})
              </option>
            ))}
          </select>
        </div>

        <ol className="space-y-4">
          {surah.arabic.ayahs.map((ayah, index) => (
            <li key={ayah.number} className="border-b pb-2">
              <p
                className="text-lg font-arabic"
                style={{ fontFamily: `'Amiri Quran', serif` }}
              >
                {ayah.text}
              </p>
              <p className="text-sm text-gray-500">{surah.translation.ayahs[index].text}</p>
              <AudioPlayer audioUrl={surah.audio.ayahs[index].audio} />
            </li>
          ))}
        </ol>
      </motion.article>
    </div>
  );
};

export default SurahDetails;
