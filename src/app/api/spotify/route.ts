import { NextRequest, NextResponse } from 'next/server';
import { DEMO_FALLBACK_PLAYLISTS, parseSpotifyUrl } from '@/lib/spotify';
import { Playlist, Track } from '@/lib/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const input = searchParams.get('input') || searchParams.get('id') || searchParams.get('url') || '';

  if (!input) {
    return NextResponse.json({ error: 'Playlist ID or Spotify URL is required' }, { status: 400 });
  }

  const parsed = parseSpotifyUrl(input);
  const playlistId = parsed.id || input;

  try {
    const embedUrl = `https://open.spotify.com/embed/${parsed.type === 'album' ? 'album' : 'playlist'}/${playlistId}`;
    const embedRes = await fetch(embedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      next: { revalidate: 3600 },
    });

    if (embedRes.ok) {
      const html = await embedRes.text();
      const nextDataMatch = html.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/);

      if (nextDataMatch && nextDataMatch[1]) {
        try {
          const nextData = JSON.parse(nextDataMatch[1]);
          const entityData = nextData?.props?.pageProps?.state?.data?.entity || nextData?.props?.pageProps?.state?.data;

          if (entityData) {
            const title = entityData.name || entityData.title || 'Spotify Playlist';
            const description = entityData.description || 'Personal Spotify Playlist';
            const owner = entityData.owner?.name || entityData.artists?.[0]?.name || 'Spotify User';
            const artworkUrl = entityData.coverArt?.sources?.[0]?.url || entityData.images?.[0]?.url || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80';

            const rawTracks = entityData.trackList || entityData.tracks?.items || entityData.tracks || [];

            const tracks: Track[] = rawTracks.map((item: any, idx: number) => {
              const trackObj = item.track || item;
              const trackTitle = trackObj.title || trackObj.name || `Track ${idx + 1}`;
              const artistName = trackObj.subtitle || (Array.isArray(trackObj.artists) ? trackObj.artists.map((a: any) => a.name).join(', ') : 'Various Artists');
              const albumTitle = trackObj.album?.name || title;
              const durationMs = trackObj.duration || trackObj.duration_ms || 180000;
              const trackArt = trackObj.coverArt?.sources?.[0]?.url || trackObj.album?.images?.[0]?.url || artworkUrl;
              const previewUrl = trackObj.audioPreview?.url || trackObj.preview_url || null;
              const trackUri = trackObj.uri || `spotify:track:${playlistId}_${idx}`;

              return {
                id: trackObj.id || `track_${idx}_${Date.now()}`,
                title: trackTitle,
                artist: artistName,
                album: albumTitle,
                durationMs: typeof durationMs === 'number' ? durationMs : 180000,
                artworkUrl: trackArt,
                previewUrl: previewUrl,
                spotifyUri: trackUri,
                spotifyUrl: `https://open.spotify.com/track/${trackObj.id || ''}`,
              };
            });

            const fetchedPlaylist: Playlist = {
              id: playlistId,
              title,
              description,
              owner,
              artworkUrl,
              tracksCount: tracks.length,
              tracks,
              spotifyUrl: `https://open.spotify.com/playlist/${playlistId}`,
              spotifyUri: `spotify:playlist:${playlistId}`,
              colorAccent: '#d4af37',
            };

            return NextResponse.json(fetchedPlaylist);
          }
        } catch (e) {
          console.warn('Next data parsing failed, falling back', e);
        }
      }
    }

    if (DEMO_FALLBACK_PLAYLISTS[playlistId]) {
      return NextResponse.json(DEMO_FALLBACK_PLAYLISTS[playlistId]);
    }

    const oembedUrl = `https://open.spotify.com/oembed?url=https://open.spotify.com/playlist/${playlistId}`;
    const oembedRes = await fetch(oembedUrl);

    if (oembedRes.ok) {
      const oembed = await oembedRes.json();
      const title = oembed.title || 'Personal Spotify Playlist';
      const artworkUrl = oembed.thumbnail_url || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80';

      const fallbackPlaylist: Playlist = {
        id: playlistId,
        title: title,
        description: 'Personal Spotify Playlist imported via URL.',
        owner: 'Spotify User',
        artworkUrl: artworkUrl,
        tracksCount: 5,
        spotifyUrl: `https://open.spotify.com/playlist/${playlistId}`,
        spotifyUri: `spotify:playlist:${playlistId}`,
        colorAccent: '#d4af37',
        tracks: Array.from({ length: 5 }).map((_, idx) => ({
          id: `sp_track_${idx + 1}`,
          title: `Track #${idx + 1} from ${title}`,
          artist: 'Spotify Artist',
          album: title,
          durationMs: (160 + idx * 25) * 1000,
          artworkUrl: artworkUrl,
          previewUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
          spotifyUri: `spotify:playlist:${playlistId}`,
          spotifyUrl: `https://open.spotify.com/playlist/${playlistId}`,
        })),
      };

      return NextResponse.json(fallbackPlaylist);
    }

    return NextResponse.json(DEMO_FALLBACK_PLAYLISTS['5NqDXfrd00Dh16H490j8Oo']);
  } catch (error: any) {
    console.error('Spotify API fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Spotify playlist. Please check your URL.' },
      { status: 500 }
    );
  }
}
