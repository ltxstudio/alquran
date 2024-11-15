import { useState, useEffect } from 'react';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (bookmark) => {
    setBookmarks([...bookmarks, bookmark]);
  };

  const removeBookmark = (id) => {
    setBookmarks(bookmarks.filter((b) => b.id !== id));
  };

  return { bookmarks, addBookmark, removeBookmark };
};
