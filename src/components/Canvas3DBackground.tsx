'use client';

import React, { useEffect, useRef } from 'react';

export default function Canvas3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 1000 + 200, // 3D depth
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.6,
      speedY: (Math.random() - 0.5) * 0.6,
      color: Math.random() > 0.5 ? '#f59e0b' : '#3b82f6' // Gold & Blue glowing particles
    }));

    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      angle += 0.002;

      // Draw subtle ambient glow spots
      const gradient = ctx.createRadialGradient(
        width * 0.2,
        height * 0.3,
        50,
        width * 0.2,
        height * 0.3,
        400
      );
      gradient.addColorStop(0, 'rgba(245, 158, 11, 0.04)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Render 3D particles with perspective projection
      const fov = 400;
      const cx = width / 2;
      const cy = height / 2;

      particles.forEach((p) => {
        p.x += p.speedX + Math.sin(angle) * 0.2;
        p.y += p.speedY + Math.cos(angle) * 0.2;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const scale = fov / (fov + p.z);
        const x2d = (p.x - cx) * scale + cx;
        const y2d = (p.y - cy) * scale + cy;
        const size2d = p.size * scale * 1.8;

        ctx.beginPath();
        ctx.arc(x2d, y2d, Math.max(0.5, size2d), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = scale * 0.6;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
    />
  );
}
