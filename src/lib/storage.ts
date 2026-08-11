import { SavedPlaylist } from './types';

const STORAGE_KEY = 'myspotify_saved_playlists';

export function getSavedPlaylists(): SavedPlaylist[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Failed to read saved playlists from localStorage', err);
    return [];
  }
}

export function savePlaylist(playlist: SavedPlaylist): SavedPlaylist[] {
  if (typeof window === 'undefined') return [];
  try {
    const existing = getSavedPlaylists();
    if (existing.some(p => p.id === playlist.id)) {
      return existing;
    }
    const updated = [playlist, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to save playlist to localStorage', err);
    return [];
  }
}

export function removeSavedPlaylist(id: string): SavedPlaylist[] {
  if (typeof window === 'undefined') return [];
  try {
    const existing = getSavedPlaylists();
    const updated = existing.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to remove playlist from localStorage', err);
    return [];
  }
}

export function isPlaylistSaved(id: string): boolean {
  if (typeof window === 'undefined') return false;
  const existing = getSavedPlaylists();
  return existing.some(p => p.id === id);
}
