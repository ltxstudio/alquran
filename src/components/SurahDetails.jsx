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
  const { addBookmark } = useBookmarks();

  useEffect(() => {
    axios.get(`https://api.alquran.cloud/v1/surah/${number}/editions/quran-simple,en.asad,ar.alafasy`)
      .then((response) => {
        const [arabic, translation, audio] = response.data.data;
        setSurah({
          arabic,
          translation,
          audio,
        });
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [number]);

  return (
    <div className="p-4">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <motion.article
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <header className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold">{surah.translation.name}</h1>
              <p className="text-sm text-gray-500">{surah.translation.englishNameTranslation}</p>
            </div>
            <button
              onClick={() => addBookmark({ id: surah.arabic.number, text: surah.translation.name })}
              className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full"
            >
              <BookmarkIcon className="w-6 h-6 text-blue-500" />
            </button>
          </header>
          <ol className="space-y-4">
            {surah.arabic.ayahs.map((ayah, index) => (
              <li key={ayah.number} className="border-b pb-2">
                <p className="text-lg">{ayah.text}</p>
                <p className="text-sm text-gray-500">{surah.translation.ayahs[index].text}</p>
                <AudioPlayer audioUrl={surah.audio.ayahs[index].audio} />
              </li>
            ))}
          </ol>
        </motion.article>
      )}
    </div>
  );
};

export default SurahDetails;
