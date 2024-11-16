import { useRef, useState } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';

const AudioPlayer = ({ audioUrls }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % audioUrls.length;
    setCurrentIndex(nextIndex);
  };

  const handleEnded = () => {
    handleNext(); // Move to the next audio
    audioRef.current.play(); // Play the next one automatically
  };

  return (
    <div className="flex items-center mt-2 space-x-4">
      <button
        onClick={togglePlayPause}
        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
      >
        {isPlaying ? (
          <PauseIcon className="w-6 h-6 text-blue-500" />
        ) : (
          <PlayIcon className="w-6 h-6 text-blue-500" />
        )}
      </button>
      <audio
        ref={audioRef}
        src={audioUrls[currentIndex]}
        onEnded={handleEnded} // Automatically play next audio when current ends
      />
    </div>
  );
};

export default AudioPlayer;
