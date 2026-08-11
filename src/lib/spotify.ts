import { Playlist, Track } from './types';

export interface ParsedSpotifyInput {
  type: 'playlist' | 'album' | 'track' | 'unknown';
  id: string;
}

export function parseSpotifyUrl(input: string): ParsedSpotifyInput {
  if (!input) return { type: 'unknown', id: '' };

  const clean = input.trim();

  const uriMatch = clean.match(/^spotify:(playlist|album|track):([a-zA-Z0-9]+)$/);
  if (uriMatch) {
    return { type: uriMatch[1] as ParsedSpotifyInput['type'], id: uriMatch[2] };
  }

  const urlMatch = clean.match(/open\.spotify\.com\/(?:embed\/)?(playlist|album|track)\/([a-zA-Z0-9]+)/);
  if (urlMatch) {
    return { type: urlMatch[1] as ParsedSpotifyInput['type'], id: urlMatch[2] };
  }

  if (/^[a-zA-Z0-9]{22}$/.test(clean)) {
    return { type: 'playlist', id: clean };
  }

  return { type: 'unknown', id: '' };
}

export function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export function formatMs(ms: number): string {
  return formatTime(ms / 1000);
}

export const PRESET_PLAYLISTS: { id: string; name: string; category: string; description: string; artwork: string }[] = [
  {
    id: '5NqDXfrd00Dh16H490j8Oo',
    name: 'My Personal Playlist',
    category: 'User Personal Collection',
    description: 'Your personal Spotify playlist collection with 100+ tracks.',
    artwork: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80',
  },
  {
    id: '37i9dQZF1DXcBWIGoYBM5M',
    name: 'Champagne Lounge',
    category: 'Deluxe Salon & Chill',
    description: 'Sophisticated deep lounge melodies for high-end salon ambiance.',
    artwork: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80',
  },
  {
    id: '37i9dQZF1DXdLEN7aqioXM',
    name: 'Velvet Atelier',
    category: 'Couture Soundscapes',
    description: 'Smooth instrumental lofi and chillhop for relaxation.',
    artwork: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
  },
  {
    id: '37i9dQZF1DXdLEN7aqioXN',
    name: 'Parisian Chic',
    category: 'Haute Couture Beats',
    description: 'Retro synthwave and elegant electronic rhythms.',
    artwork: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&q=80',
  },
  {
    id: '37i9dQZF1DWZeKCadgRdKQ',
    name: 'Deep House Deluxe',
    category: 'VIP Lounge',
    description: 'Atmospheric deep house and ambient sounds for luxury styling.',
    artwork: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&q=80',
  }
];

export const DEMO_FALLBACK_PLAYLISTS: Record<string, Playlist> = {
  '5NqDXfrd00Dh16H490j8Oo': {
    id: '5NqDXfrd00Dh16H490j8Oo',
    title: 'My Personal Spotify Playlist',
    description: 'Personal playlist loaded via Spotify URL.',
    owner: 'Spotify User',
    artworkUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
    tracksCount: 5,
    spotifyUrl: 'https://open.spotify.com/playlist/5NqDXfrd00Dh16H490j8Oo',
    spotifyUri: 'spotify:playlist:5NqDXfrd00Dh16H490j8Oo',
    colorAccent: '#d4af37',
    tracks: [
      {
        id: 'user_track_1',
        title: 'Espresso',
        artist: 'Sabrina Carpenter',
        album: 'Short n’ Sweet',
        durationMs: 175400,
        artworkUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80',
        previewUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
        spotifyUri: 'spotify:track:2lyv54641c888',
        spotifyUrl: 'https://open.spotify.com/track/2lyv54641c888',
      },
      {
        id: 'user_track_2',
        title: 'Starboy',
        artist: 'The Weeknd, Daft Punk',
        album: 'Starboy',
        durationMs: 230000,
        artworkUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&q=80',
        previewUrl: 'https://cdn.pixabay.com/download/audio/2021/09/06/audio_8b5cfdf770.mp3?filename=cyberpunk-beat-7880.mp3',
        spotifyUri: 'spotify:track:7fBv2hMBRtMKn',
        spotifyUrl: 'https://open.spotify.com/track/7fBv2hMBRtMKn',
      }
    ]
  }
};
