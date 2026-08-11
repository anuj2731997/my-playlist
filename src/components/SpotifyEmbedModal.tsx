'use client';

import React from 'react';
import { X, Radio } from 'lucide-react';

interface SpotifyEmbedModalProps {
  playlistId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const SpotifyEmbedModal: React.FC<SpotifyEmbedModalProps> = ({
  playlistId,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !playlistId) return null;

  const embedUrl = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '120px',
        right: '28px',
        width: '380px',
        zIndex: 65,
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.85), 0 0 35px var(--gold-glow)',
        border: '1px solid var(--border-gold-bright)',
        background: 'rgba(10, 8, 14, 0.92)',
        backdropFilter: 'blur(30px)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 18px',
          background: 'rgba(255, 255, 255, 0.04)',
          borderBottom: '1px solid var(--border-gold)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--gold-light)' }}>
          <Radio size={16} color="var(--gold-primary)" />
          Spotify Official Embed Player
        </div>
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
        >
          <X size={18} />
        </button>
      </div>

      <div style={{ height: '380px', width: '100%' }}>
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
    </div>
  );
};
