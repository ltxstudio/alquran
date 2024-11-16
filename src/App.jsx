import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SurahList from './components/SurahList';
import SurahDetails from './components/SurahDetails';
import BookmarkList from './components/BookmarkList';
import DarkModeToggle from './components/DarkModeToggle';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <Router>
        {/* Header Section */}
        <header className="sticky top-0 z-10 p-4 bg-blue-600 dark:bg-blue-800 text-white flex justify-between items-center shadow-md">
          <h1 className="text-2xl font-bold">Al-Quran App</h1>
          <DarkModeToggle />
        </header>

        {/* Main Content Section */}
        <main className="p-4 sm:p-6 md:p-8 lg:p-10">
          <Routes>
            <Route path="/" element={<SurahList />} />
            <Route path="/surah/:number" element={<SurahDetails />} />
          </Routes>
        </main>

        {/* Bookmark Section (Visible on all pages) */}
        <aside className="fixed bottom-0 right-0 m-4 sm:m-6 p-4 bg-blue-500 dark:bg-blue-600 rounded-lg shadow-lg z-20">
          <BookmarkList />
        </aside>

        {/* Footer Section */}
        <footer className="p-4 text-center text-sm bg-gray-200 dark:bg-gray-800 mt-10">
          <p>&copy; 2024 Al-Quran App. All rights reserved.</p>
        </footer>
      </Router>
    </div>
  );
};

export default App;
