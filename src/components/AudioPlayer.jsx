import { SpeakerWaveIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

const AudioPlayer = ({ audioUrl }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center space-x-2 mt-4"
    >
      <SpeakerWaveIcon className="w-6 h-6 text-blue-500" />
      <audio controls className="flex-1">
        <source src={audioUrl} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </motion.div>
  );
};

export default AudioPlayer;
