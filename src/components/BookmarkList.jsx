import { useBookmarks } from '../hooks/useBookmarks';
import { TrashIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

const BookmarkList = () => {
  const { bookmarks, removeBookmark } = useBookmarks();

  return (
    <motion.div
      className="mt-6 p-6 border rounded-lg bg-gray-50 dark:bg-gray-800 shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Bookmarks</h2>
      
      {bookmarks.length > 0 ? (
        <ul className="space-y-4">
          {bookmarks.map((bookmark) => (
            <li
              key={bookmark.id}
              className="flex justify-between items-center p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200 ease-in-out"
            >
              <span className="text-lg text-gray-800 dark:text-white">{bookmark.text}</span>
              <button
                onClick={() => removeBookmark(bookmark.id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <TrashIcon className="w-6 h-6" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-lg text-gray-500 dark:text-gray-300">No bookmarks yet!</p>
      )}
    </motion.div>
  );
};

export default BookmarkList;
