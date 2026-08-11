export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  durationMs: number;
  artworkUrl: string;
  previewUrl: string | null;
  spotifyUri: string;
  spotifyUrl: string;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  owner: string;
  artworkUrl: string;
  tracksCount: number;
  tracks: Track[];
  spotifyUrl: string;
  spotifyUri: string;
  colorAccent?: string;
}

export type VisualizerMode = 'equalizer' | 'cyberwave' | 'radial' | 'particles';

export interface SavedPlaylist {
  id: string;
  title: string;
  owner: string;
  artworkUrl: string;
  tracksCount: number;
  spotifyUrl: string;
  addedAt: number;
}
