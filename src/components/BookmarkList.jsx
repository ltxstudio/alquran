import { useBookmarks } from '../hooks/useBookmarks';
import { TrashIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

const BookmarkList = () => {
  const { bookmarks, removeBookmark } = useBookmarks();

  return (
    <motion.div
      className="mt-6 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-xl font-bold mb-2">Bookmarks</h2>
      {bookmarks.length > 0 ? (
        <ul className="space-y-2">
          {bookmarks.map((bookmark) => (
            <li
              key={bookmark.id}
              className="flex justify-between items-center p-2 border-b dark:border-gray-600"
            >
              <span>{bookmark.text}</span>
              <button
                onClick={() => removeBookmark(bookmark.id)}
                className="text-red-500"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookmarks yet!</p>
      )}
    </motion.div>
  );
};

export default BookmarkList;
