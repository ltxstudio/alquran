import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SurahList from './components/SurahList';
import SurahDetails from './components/SurahDetails';
import BookmarkList from './components/BookmarkList';
import DarkModeToggle from './components/DarkModeToggle';
import { logEvent } from 'firebase/analytics';
import { analytics } from './firebase'; // Import Firebase Analytics

const App = () => {
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);

  // Toggle Bookmark Modal
  const toggleBookmarks = () => {
    setIsBookmarksOpen(!isBookmarksOpen);
    // Log event when bookmarks are opened/closed
    logEvent(analytics, 'bookmark_modal_toggle', {
      isOpen: !isBookmarksOpen, // passing the state to track if modal is open
    });
  };

  useEffect(() => {
    // Log event when the app is loaded
    logEvent(analytics, 'app_opened');
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <Router>
        {/* Header Section */}
        <header className="sticky top-0 z-10 p-4 bg-blue-600 dark:bg-blue-800 text-white flex justify-between items-center shadow-md">
          <h1 className="text-2xl font-bold">
            <Link to="/">Al-Quran App</Link>
          </h1>
          <div className="flex items-center space-x-4">
            <DarkModeToggle />
            <button
              onClick={toggleBookmarks}
              className="bg-blue-500 hover:bg-blue-600 p-2 rounded-full focus:outline-none"
            >
              <span className="text-white">Bookmarks</span>
            </button>
          </div>
        </header>

        {/* Main Content Section */}
        <main className="p-4 sm:p-6 md:p-8 lg:p-10">
          <Routes>
            <Route path="/" element={<SurahList />} />
            <Route path="/surah/:number" element={<SurahDetails />} />
          </Routes>
        </main>

        {/* Bookmark Modal */}
        {isBookmarksOpen && (
          <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 sm:w-2/3 md:w-1/2">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Your Bookmarks</h2>
              <BookmarkList />
              <button
                onClick={toggleBookmarks}
                className="mt-4 bg-red-500 text-white p-2 rounded-full w-full hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Footer Section */}
        <footer className="p-4 text-center text-sm bg-gray-200 dark:bg-gray-800 mt-10">
          <p>&copy; 2024 Al-Quran App. All rights reserved.</p>
        </footer>
      </Router>
    </div>
  );
};

export default App;
