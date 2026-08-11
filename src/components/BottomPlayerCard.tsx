'use client';

import React, { useState, useEffect } from 'react';
import { Layers, Sparkles, LogIn, X, Info, Check } from 'lucide-react';
import { Track } from '@/lib/types';

interface BottomPlayerCardProps {
  track: Track | null;
  playlistId: string;
  onToggleDrawer: () => void;
  isDrawerOpen: boolean;
}

export const BottomPlayerCard: React.FC<BottomPlayerCardProps> = ({
  track,
  playlistId,
  onToggleDrawer,
  isDrawerOpen,
}) => {
  const [showNotice, setShowNotice] = useState<boolean>(false);

  useEffect(() => {
    // Only show login notification if user is NOT logged into Spotify
    const isLoggedIn = localStorage.getItem('spotify_logged_in') === 'true';
    if (!isLoggedIn) {
      setShowNotice(true);
    }
  }, []);

  const handleMarkLoggedIn = () => {
    localStorage.setItem('spotify_logged_in', 'true');
    setShowNotice(false);
  };

  if (!playlistId) return null;

  const embedUrl = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        width: '92%',
        maxWidth: '860px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      {/* ONLY SHOW IF NOT LOGGED IN */}
      {showNotice && (
        <div
          style={{
            background: 'rgba(212, 175, 55, 0.12)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--border-gold-bright)',
            borderRadius: '16px',
            padding: '10px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
            animation: 'fadeIn 0.3s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.82rem', color: 'var(--gold-light)' }}>
            <Info size={16} color="var(--gold-primary)" style={{ flexShrink: 0 }} />
            <span>
              <strong>Not Logged In to Spotify?</strong> Log in to Spotify on your browser for full 3-minute+ track playback.
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <a
              href="https://accounts.spotify.com/login"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleMarkLoggedIn}
              className="btn-gold"
              style={{
                padding: '5px 14px',
                fontSize: '0.76rem',
                textDecoration: 'none',
                height: '28px',
                borderRadius: 'var(--radius-full)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <LogIn size={13} /> Log In ↗
            </a>

            <button
              onClick={handleMarkLoggedIn}
              className="btn-outline-gold"
              style={{
                padding: '4px 12px',
                fontSize: '0.74rem',
                height: '28px',
                borderRadius: 'var(--radius-full)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
              title="I am already logged in"
            >
              <Check size={13} /> Logged In
            </button>

            <button
              onClick={() => setShowNotice(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
              }}
              title="Dismiss notification"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      )}

      {/* LOWER MIDDLE PLAYER CAPSULE */}
      <div
        style={{
          width: '100%',
          background: 'rgba(12, 10, 18, 0.94)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          border: '1px solid var(--border-gold-bright)',
          borderRadius: '28px',
          padding: '16px 20px',
          boxShadow: '0 24px 70px rgba(0, 0, 0, 0.9), 0 0 40px var(--gold-glow)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {/* Top Bar inside Player Capsule: Track Title & Drawer Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={16} color="var(--gold-primary)" />
            <span style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--gold-light)' }}>
              Spotify Official Player
            </span>
          </div>

          <button
            onClick={onToggleDrawer}
            className={`btn-icon-gold ${isDrawerOpen ? 'active' : ''}`}
            style={{ width: 'auto', padding: '0 14px', height: '34px', borderRadius: 'var(--radius-full)', fontSize: '0.78rem', gap: '6px' }}
            title="Toggle Playlist & Soundscapes Drawer"
          >
            <Layers size={14} />
            <span>Playlist Drawer</span>
          </button>
        </div>

        {/* THE ONE & ONLY OFFICIAL SPOTIFY FULL-LENGTH PLAYER */}
        <div
          style={{
            width: '100%',
            height: '152px',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid var(--border-gold)',
            background: '#000',
            boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
          }}
        >
          <iframe
            src={embedUrl}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};
