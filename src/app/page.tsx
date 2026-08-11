'use client';

import React, { useState, useEffect } from 'react';
import { BottomPlayerCard } from '@/components/BottomPlayerCard';
import { PlaylistDrawer } from '@/components/PlaylistDrawer';
import { Playlist, Track, SavedPlaylist } from '@/lib/types';
import { DEMO_FALLBACK_PLAYLISTS } from '@/lib/spotify';
import { getSavedPlaylists, removeSavedPlaylist } from '@/lib/storage';
import { Crown, Music } from 'lucide-react';

export default function Home() {
  const [playlist, setPlaylist] = useState<Playlist>(DEMO_FALLBACK_PLAYLISTS['5NqDXfrd00Dh16H490j8Oo']);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [savedPlaylists, setSavedPlaylists] = useState<SavedPlaylist[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const currentTrack: Track | null = playlist?.tracks?.[currentTrackIndex] || null;

  const handleFetchPlaylist = async (input: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch(`/api/spotify?input=${encodeURIComponent(input)}`);
      if (!res.ok) {
        throw new Error('Failed to load Spotify playlist');
      }
      const data: Playlist = await res.json();
      setPlaylist(data);
      setCurrentTrackIndex(0);
    } catch (err: any) {
      console.error(err);
      setErrorMessage('Could not load playlist. Please check your Spotify URL or ID.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setSavedPlaylists(getSavedPlaylists());
    handleFetchPlaylist('https://open.spotify.com/playlist/5NqDXfrd00Dh16H490j8Oo');
  }, []);

  const handleRemoveSaved = (id: string) => {
    const updated = removeSavedPlaylist(id);
    setSavedPlaylists(updated);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100vw', background: '#08070b', overflowX: 'hidden', paddingBottom: '220px' }}>
      
      {/* Simple & Modern Ambient Background */}
      <div className="ambient-bg" />

      {/* HERO SECTION: Deluxe Salon Sound Atelier */}
      <section
        style={{
          paddingTop: '160px',
          paddingBottom: '60px',
          paddingLeft: '32px',
          paddingRight: '32px',
          maxWidth: '860px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '24px',
        }}
      >
        <h1 className="serif" style={{ fontSize: '4.2rem', fontWeight: 700, color: 'var(--gold-light)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          Where Bespoke Beauty Meets Audio Elegance.
        </h1>

        <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '640px' }}>
          Relax and enjoy your personal Spotify playlist in our modern deluxe audio lounge experience.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '16px' }}>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="btn-gold"
            style={{ padding: '14px 36px', fontSize: '0.95rem' }}
          >
            <Music size={18} /> Open Soundscapes & Tracks
          </button>
        </div>
      </section>

      {/* Toast Error Message */}
      {errorMessage && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 80,
            padding: '10px 24px',
            background: 'rgba(239, 68, 68, 0.9)',
            borderRadius: '99px',
            color: '#fff',
            fontSize: '0.85rem',
            fontWeight: 600,
          }}
        >
          {errorMessage}
        </div>
      )}

      {/* THE ONE & ONLY LOWER MIDDLE SPOTIFY PLAYER CAPSULE */}
      <BottomPlayerCard
        track={currentTrack}
        playlistId={playlist.id}
        onToggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
        isDrawerOpen={isDrawerOpen}
      />

      {/* Slide-out Soundscape & Tracklist Drawer */}
      <PlaylistDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        playlist={playlist}
        currentTrackId={currentTrack?.id || null}
        isPlaying={false}
        onTrackSelect={(idx) => {
          setCurrentTrackIndex(idx);
        }}
        savedPlaylists={savedPlaylists}
        onSelectPlaylist={handleFetchPlaylist}
        onRemoveSaved={handleRemoveSaved}
        sceneMode={'luxury' as any}
        onChangeSceneMode={() => {}}
        visualizerMode={'equalizer'}
        onChangeVisualizerMode={() => {}}
        onSearchPlaylist={handleFetchPlaylist}
      />

    </div>
  );
}
