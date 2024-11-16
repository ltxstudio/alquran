# Al-Quran App

The Al-Quran App is a modern web application that allows users to explore the Quran. It provides features like reading the Surahs, listening to their recitations, viewing translations, and bookmarking favorite verses. This app is built using **React**, **Vite**, and **Tailwind CSS** for styling, with additional functionalities like dark mode, responsive design, and dynamic translations from the Quran API.

## Features

- **Surah List**: Browse all the Surahs of the Quran.
- **Surah Details**: View each Surah with its Arabic text, English translation, and audio recitation.
- **Audio Player**: Listen to the recitations of the Surahs.
- **Dark Mode**: Toggle between light and dark modes for a better user experience.
- **Responsive Design**: Optimized for desktop, tablet, and mobile views.
- **Bookmarking**: Save your favorite Surahs or verses.

## Demo

A live demo of the app can be seen here (add the URL if applicable).

## Technologies Used

- **React**: For building the user interface.
- **Vite**: For fast development and build process.
- **Tailwind CSS**: For styling and responsive design.
- **Framer Motion**: For animations and smooth transitions.
- **Heroicons**: For icons.
- **Al-Quran API**: To fetch Surah data, translations, and audio recitations.

## Prerequisites

Make sure you have the following tools installed on your system:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/your-username/alquran-app.git
   ```

2. Navigate into the project directory:
   ```bash
   cd alquran-app
   ```

3. Install the project dependencies:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

   This will start the app at `http://localhost:3000`. Open this URL in your browser to view the app.

## Usage

Once the app is running, you can:

- Browse all Surahs.
- Select a Surah to view its details, including Arabic text, English translation, and listen to the recitation.
- Bookmark your favorite Surahs or verses for easy access later.
- Toggle between light and dark modes using the dark mode button.

## Folder Structure

```bash
src/
├── components/        # All UI components
│   ├── BookmarkList.jsx
│   ├── DarkModeToggle.jsx
│   ├── SurahDetails.jsx
│   └── SurahList.jsx
├── hooks/             # Custom React hooks
│   └── useBookmarks.js
├── App.jsx            # Main app component
├── index.css          # Global styles
└── index.html         # Main HTML file
```

## Tailwind CSS Configuration

Tailwind CSS is configured to work with the app, including support for custom fonts (such as the `Amiri Quran` font) and dark mode. The configuration is located in `tailwind.config.js`.

## API

The app uses the [Al-Quran API](https://api.alquran.cloud/) to fetch data for the Surahs, their recitations, and translations. The API provides access to multiple translations and audio recitations in different languages.

## Dark Mode

The app includes a dark mode toggle. The theme switches between light and dark modes based on user preference.

## Development Tips

- **Responsive Design**: Tailwind CSS classes are used to ensure the app works on all screen sizes. Use Tailwind's responsive utility classes (e.g., `sm:`, `md:`, `lg:`) for fine-tuning the layout on different devices.
- **Animations**: Framer Motion is used to animate the transitions between pages and UI elements for a smoother user experience.

## Contributing

We welcome contributions to improve the app. Here’s how you can contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to your branch (`git push origin feature-name`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
