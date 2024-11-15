import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SurahList from './components/SurahList';
import SurahDetails from './components/SurahDetails';
import BookmarkList from './components/BookmarkList';
import DarkModeToggle from './components/DarkModeToggle';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <Router>
        <header className="sticky top-0 z-10 p-4 bg-blue-500 text-white flex justify-between items-center">
          <h1 className="text-xl font-bold">Al-Quran App</h1>
          <DarkModeToggle />
        </header>
        <main className="p-4">
          <Routes>
            <Route path="/" element={<SurahList />} />
            <Route path="/surah/:number" element={<SurahDetails />} />
          </Routes>
          <BookmarkList />
        </main>
        <footer className="p-4 text-center text-sm bg-gray-200 dark:bg-gray-800">
          &copy; 2024 Al-Quran App. All rights reserved.
        </footer>
      </Router>
    </div>
  );
};

export default App;
