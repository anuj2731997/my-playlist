# My Spotify Playlist 🎵

A modern, minimal Next.js web application designed to load and play your personal Spotify playlists with a luxury dark aesthetic interface.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-gold?style=flat-square)

---

## ✨ Features

- **Personal Spotify Playlist Auto-Loader**: Default loads your personal Spotify playlist (`https://open.spotify.com/playlist/5NqDXfrd00Dh16H490j8Oo`) on page load.
- **Unified Lower-Middle Player Capsule**: Fixed at bottom-center with the official Spotify Web Player iframe for full-length song playback.
- **Slide-Out Tracklist & Soundscapes Drawer**:
  - **Playlist URL Importer**: Paste any Spotify Playlist URL or ID to load its tracks dynamically.
  - **Curated Soundscapes**: Quick switcher for preset playlists.
- **Minimal & Aesthetic Dark Design**: Built with luxury dark gold typography, soft ambient background glow (`.ambient-bg`), and responsive glassmorphism.
- **Smart Spotify Login Detection**: Non-intrusive toast banner guiding unauthenticated users to log into Spotify for uncapped track streaming.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Vanilla CSS (CSS Variables, Glassmorphism, Responsive Grid)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio Engine**: Server-side Next.js API Route (`/api/spotify`) + Official Spotify Web Embed

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later installed on your machine.
- `npm` or `yarn` package manager.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/anuj2731997/my-playlist.git
   cd my-playlist
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view your app.

---

## 🏗️ Production Build

To build the production bundle:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

---

## 📁 Project Structure

```text
mySpotify/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── spotify/
│   │   │       └── route.ts         # Server-side Spotify metadata fetcher
│   │   ├── globals.css              # Deluxe theme & CSS design system
│   │   ├── layout.tsx               # Root layout & page metadata
│   │   └── page.tsx                 # Main application page
│   ├── components/
│   │   ├── BottomPlayerCard.tsx     # Lower-middle single Spotify player capsule
│   │   ├── PlaylistDrawer.tsx       # Slide-out drawer with tracks & URL importer
│   │   └── Visualizer.tsx           # Audio visualizer component
│   └── lib/
│       ├── spotify.ts               # Spotify URL parsers & preset playlists
│       ├── storage.ts               # LocalStorage favorites manager
│       └── types.ts                 # TypeScript interfaces
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📜 License

Distributed under the MIT License.
