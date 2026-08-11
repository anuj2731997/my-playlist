'use client';

import React, { useState } from 'react';
import { X, Crown, Search, Clipboard } from 'lucide-react';
import { Playlist, Track, SavedPlaylist, VisualizerMode } from '@/lib/types';
import { PRESET_PLAYLISTS } from '@/lib/spotify';

interface PlaylistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  playlist: Playlist;
  currentTrackId: string | null;
  isPlaying: boolean;
  onTrackSelect: (index: number) => void;
  savedPlaylists: SavedPlaylist[];
  onSelectPlaylist: (id: string) => void;
  onRemoveSaved: (id: string) => void;
  sceneMode: any;
  onChangeSceneMode: (mode: any) => void;
  visualizerMode: VisualizerMode;
  onChangeVisualizerMode: (mode: VisualizerMode) => void;
  onSearchPlaylist?: (url: string) => void;
}

export const PlaylistDrawer: React.FC<PlaylistDrawerProps> = ({
  isOpen,
  onClose,
  playlist,
  currentTrackId,
  isPlaying,
  onTrackSelect,
  savedPlaylists,
  onSelectPlaylist,
  onRemoveSaved,
  visualizerMode,
  onChangeVisualizerMode,
  onSearchPlaylist,
}) => {
  const [inputVal, setInputVal] = useState('');

  if (!isOpen) return null;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim() && onSearchPlaylist) {
      onSearchPlaylist(inputVal.trim());
      setInputVal('');
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text && onSearchPlaylist) {
        setInputVal(text);
        onSearchPlaylist(text);
      }
    } catch (err) {
      console.warn('Clipboard read error', err);
    }
  };

  return (
    <div
      className="glass-deluxe"
      style={{
        position: 'fixed',
        top: '28px',
        right: '28px',
        bottom: '125px',
        width: '460px',
        zIndex: 60,
        borderRadius: '24px',
        boxShadow: '0 30px 90px rgba(0,0,0,0.85), 0 0 40px var(--gold-glow)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        animation: 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Drawer Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 24px',
          background: 'rgba(255, 255, 255, 0.04)',
          borderBottom: '1px solid var(--border-gold)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.05rem', fontWeight: 800, color: 'var(--gold-light)' }} className="serif">
          <Crown size={18} color="var(--gold-primary)" />
          {playlist.title}
        </div>
        <button
          onClick={onClose}
          className="btn-icon-gold"
          style={{ width: '32px', height: '32px' }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Drawer Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
        
        {/* Import Spotify Playlist Search Bar */}
        <form onSubmit={handleSearchSubmit}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(10, 8, 14, 0.95)',
            border: '1px solid var(--border-gold-bright)',
            borderRadius: 'var(--radius-full)',
            padding: '4px 12px',
            gap: '8px',
          }}>
            <Search size={16} color="var(--gold-primary)" />
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Import Spotify Playlist URL or ID..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#fff',
                fontSize: '0.82rem',
                padding: '6px 0',
              }}
            />
            <button
              type="button"
              onClick={handlePaste}
              className="btn-icon-gold"
              style={{ width: '28px', height: '28px' }}
              title="Paste link"
            >
              <Clipboard size={13} />
            </button>
            <button
              type="submit"
              className="btn-gold"
              style={{ padding: '6px 14px', fontSize: '0.78rem' }}
            >
              Import
            </button>
          </div>
        </form>

        {/* Salon Featured Soundscapes */}
        <div>
          <h4 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--gold-primary)', marginBottom: '10px' }}>
            Salon Curated Soundscapes
          </h4>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {PRESET_PLAYLISTS.map((preset) => (
              <div
                key={preset.id}
                onClick={() => onSelectPlaylist(preset.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-sm)',
                  background: playlist.id === preset.id ? 'rgba(212, 175, 55, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                  border: `1px solid ${playlist.id === preset.id ? 'var(--gold-primary)' : 'var(--border-glass)'}`,
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'all 0.2s',
                }}
              >
                <img src={preset.artwork} alt={preset.name} style={{ width: '30px', height: '30px', borderRadius: '6px' }} />
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: playlist.id === preset.id ? 'var(--gold-light)' : '#fff' }}>
                  {preset.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tracks List */}
        <div>
          <h4 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--gold-primary)', marginBottom: '12px' }}>
            Tracks ({playlist.tracks.length})
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {playlist.tracks.map((track, idx) => {
              const isCurrent = currentTrackId === track.id;
              return (
                <div
                  key={track.id || idx}
                  onClick={() => onTrackSelect(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: isCurrent ? 'rgba(212, 175, 55, 0.16)' : 'rgba(255, 255, 255, 0.03)',
                    border: `1px solid ${isCurrent ? 'var(--gold-primary)' : 'transparent'}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
                    <img src={track.artworkUrl} alt={track.title} style={{ width: '40px', height: '40px', borderRadius: '8px', border: '1px solid var(--border-gold)' }} />
                    <div style={{ overflow: 'hidden' }}>
                      <p className="truncate" style={{ fontSize: '0.88rem', fontWeight: 700, color: isCurrent ? 'var(--gold-light)' : '#fff' }}>
                        {track.title}
                      </p>
                      <p className="truncate" style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                        {track.artist}
                      </p>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--gold-primary)', fontWeight: 600 }}>
                    {Math.floor(track.durationMs / 60000)}:{Math.floor((track.durationMs % 60000) / 1000).toString().padStart(2, '0')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
