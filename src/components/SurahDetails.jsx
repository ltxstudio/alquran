import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AudioPlayer from './AudioPlayer';
import { BookmarkIcon } from '@heroicons/react/24/solid';

const SurahDetails = () => {
  const { number } = useParams();
  const [surah, setSurah] = useState(null);

  useEffect(() => {
    axios.get(`https://api.alquran.cloud/v1/surah/${number}`)
      .then((response) => setSurah(response.data.data))
      .catch((error) => console.error(error));
  }, [number]);

  return (
    <div className="p-4">
      {surah ? (
        <article className="prose dark:prose-invert max-w-none">
          <header className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">{surah.englishName} ({surah.name})</h1>
              <p className="text-sm text-gray-500">{surah.englishNameTranslation}</p>
            </div>
            <button className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
              <BookmarkIcon className="w-6 h-6 text-blue-500" />
            </button>
          </header>
          <div>
            <ol className="mt-4 space-y-2">
              {surah.ayahs.map((ayah) => (
                <li key={ayah.numberInSurah} className="border-b pb-2">
                  <p className="text-lg">{ayah.text}</p>
                  <AudioPlayer audioUrl={ayah.audio} />
                </li>
              ))}
            </ol>
          </div>
        </article>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SurahDetails;
