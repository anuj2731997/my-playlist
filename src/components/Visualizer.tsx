'use client';

import React, { useEffect, useRef } from 'react';
import { VisualizerMode } from '@/lib/types';

interface VisualizerProps {
  mode: VisualizerMode;
  isPlaying: boolean;
  colorAccent?: string;
  width?: number;
  height?: number;
}

export const Visualizer: React.FC<VisualizerProps> = ({
  mode,
  isPlaying,
  colorAccent = '#d4af37',
  width = 300,
  height = 200,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let phase = 0;
    const barCount = 32;
    const bars = Array.from({ length: barCount }, () => Math.random() * 0.4);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isPlaying) {
        phase += 0.05;
      }

      for (let i = 0; i < barCount; i++) {
        const target = isPlaying
          ? 0.15 + Math.abs(Math.sin(phase + i * 0.2)) * 0.65 + Math.random() * 0.2
          : 0.05;
        bars[i] += (target - bars[i]) * 0.15;
      }

      if (mode === 'equalizer') {
        const barWidth = (canvas.width / barCount) - 3;
        for (let i = 0; i < barCount; i++) {
          const h = bars[i] * canvas.height;
          const x = i * (barWidth + 3);
          const y = canvas.height - h;

          const grad = ctx.createLinearGradient(0, canvas.height, 0, 0);
          grad.addColorStop(0, colorAccent);
          grad.addColorStop(0.7, '#e0a96d');
          grad.addColorStop(1, '#f3e8c2');

          ctx.fillStyle = grad;
          ctx.shadowBlur = isPlaying ? 10 : 0;
          ctx.shadowColor = colorAccent;
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, h, [4, 4, 0, 0]);
          ctx.fill();
        }
      } else if (mode === 'cyberwave') {
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = colorAccent;
        ctx.shadowBlur = 12;
        ctx.shadowColor = colorAccent;

        const sliceWidth = canvas.width / barCount;
        let x = 0;

        for (let i = 0; i < barCount; i++) {
          const v = isPlaying ? Math.sin(phase + i * 0.4) * bars[i] * (canvas.height / 2) : 0;
          const y = canvas.height / 2 + v;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          x += sliceWidth;
        }

        ctx.stroke();
      } else if (mode === 'radial') {
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const baseRadius = Math.min(canvas.width, canvas.height) * 0.25;

        ctx.shadowBlur = 15;
        ctx.shadowColor = colorAccent;

        for (let i = 0; i < barCount; i++) {
          const angle = (i / barCount) * Math.PI * 2 + phase * 0.2;
          const barH = bars[i] * 40;

          const x1 = cx + Math.cos(angle) * baseRadius;
          const y1 = cy + Math.sin(angle) * baseRadius;
          const x2 = cx + Math.cos(angle) * (baseRadius + barH);
          const y2 = cy + Math.sin(angle) * (baseRadius + barH);

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.lineWidth = 3;
          ctx.strokeStyle = i % 2 === 0 ? colorAccent : '#e0a96d';
          ctx.stroke();
        }
      } else if (mode === 'particles') {
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;

        for (let i = 0; i < barCount; i++) {
          const angle = (i / barCount) * Math.PI * 2 + phase * 0.4;
          const dist = (bars[i] * 0.4 + 0.1) * Math.min(canvas.width, canvas.height);
          const px = cx + Math.cos(angle) * dist;
          const py = cy + Math.sin(angle) * dist;
          const r = bars[i] * 5 + 2;

          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.fillStyle = i % 3 === 0 ? colorAccent : i % 3 === 1 ? '#e0a96d' : '#f3e8c2';
          ctx.shadowBlur = 12;
          ctx.shadowColor = ctx.fillStyle;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [mode, isPlaying, colorAccent]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        width: '100%',
        height: `${height}px`,
        borderRadius: 'var(--radius-md)',
      }}
    />
  );
};
