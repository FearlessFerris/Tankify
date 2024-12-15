// PinkLavaCanvas.jsx
import React, { useRef, useEffect, useState } from 'react';

const PinkLavaCanvas = () => {
  const canvasRef = useRef(null);

  // The hailstorm embers
  const particles = useRef([]);
  // Smoke particles from the “wand”
  const smokeParticles = useRef([]);

  // Track mouse position, and whether the mouse is inside the canvas area
  const [mousePos, setMousePos] = useState({ x: null, y: null });
  const [isMouseInside, setIsMouseInside] = useState(false);

  // Helper: draw a random, irregular polygon
  const drawRandomPolygon = (ctx, x, y, maxSize, sides = 4) => {
    ctx.beginPath();
    let angle = Math.random() * 2 * Math.PI;
    for (let i = 0; i < sides; i++) {
      const radius = Math.random() * maxSize + (0.5 * maxSize);
      ctx.lineTo(
        x + radius * Math.cos(angle),
        y + radius * Math.sin(angle)
      );
      // random offset for each side
      angle += (2 * Math.PI) / sides + (Math.random() - 0.5) * 0.5;
    }
    ctx.closePath();
  };

  // Weighted velocity: mostly slow, some fast
  const getVelocity = () => {
    const isSlow = Math.random() < 0.8; // 80% slow, 20% fast
    if (isSlow) {
      const vy = 0.3 + Math.random() * 0.5;  // ~0.3 to 0.8
      const vx = -0.8 + Math.random() * 0.6; // ~-0.8 to -0.2
      return { vx, vy };
    } else {
      // Fast
      const vy = 1.0 + Math.random() * 1.5;  // ~1.0 to 2.5
      const vx = -1.5 + Math.random() * 1.0; // ~-1.5 to -0.5
      return { vx, vy };
    }
  };

  // Spawn ember from top edge (hailstorm style)
  const spawnFromTop = (canvas) => {
    const { vx, vy } = getVelocity();
    return {
      x: Math.random() * canvas.width,
      y: -20,
      vx,
      vy,
      sides: 3 + Math.floor(Math.random() * 6), // 3–8 sides
      size: 2 + Math.random() * 2,
      baseAlpha: 0.4 + Math.random() * 0.6,
    };
  };

  // Spawn smoke at mouse location
  const spawnSmokeParticle = (mx, my) => {
    return {
      x: mx,
      y: my,
      life: 1.0,       // smoke fully opaque initially
      decay: 0.02,     // how fast smoke fades out
      size: 5 + Math.random() * 5, 
      vx: (Math.random() - 0.5) * 0.3, // gentle horizontal drift
      vy: (Math.random() - 0.8) * 0.3, // mostly drifting upward
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Canvas sizing
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Instead of canvas events, use window events
    // so pointerEvents: 'none' won't block the logic
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      // Check if mouse is within canvas bounds
      const rect = canvas.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      setIsMouseInside(inside);
    };

    const handleMouseLeave = () => {
      setIsMouseInside(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Initialize hailstorm embers
    const numParticles = 120;
    particles.current = [];
    for (let i = 0; i < numParticles; i++) {
      if (i < numParticles / 2) {
        // Spawn half directly on-screen
        const { vx, vy } = getVelocity();
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx,
          vy,
          sides: 3 + Math.floor(Math.random() * 6),
          size: 2 + Math.random() * 2,
          baseAlpha: 0.4 + Math.random() * 0.6,
        });
      } else {
        // Spawn from top
        particles.current.push(spawnFromTop(canvas));
      }
    }

    // Smoke array
    smokeParticles.current = [];

    // For center-based brightness
    const cx = () => canvas.width / 2;
    const cy = () => canvas.height / 2;
    const maxDist = () => Math.sqrt(cx() ** 2 + cy() ** 2);

    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1) UPDATE & DRAW HAILSTORM EMBERS
      for (let p of particles.current) {
        // Subtle mouse repulsion if inside canvas
        if (isMouseInside && mousePos.x !== null && mousePos.y !== null) {
          const dx = p.x - mousePos.x;
          const dy = p.y - mousePos.y;
          const dist2 = dx * dx + dy * dy;
          const minDist2 = 10000; // ~100px radius squared
          if (dist2 < minDist2) {
            const force = 0.015; 
            p.vx += (dx / Math.sqrt(dist2)) * force;
            p.vy += (dy / Math.sqrt(dist2)) * force;
          }
        }

        // Move ember
        p.x += p.vx;
        p.y += p.vy;

        // Recycle if off-screen (left/bottom)
        if (p.x < -50 || p.y > canvas.height + 50) {
          Object.assign(p, spawnFromTop(canvas));
        }

        // Center brightness
        const dxC = p.x - cx();
        const dyC = p.y - cy();
        const distC = Math.sqrt(dxC * dxC + dyC * dyC);
        const distRatio = 1 - distC / maxDist(); 
        const alphaFactor = Math.max(0, distRatio);
        const finalAlpha = p.baseAlpha + alphaFactor * 2.0; // up to ~3x near center

        ctx.save();
        ctx.globalAlpha = finalAlpha;
        ctx.fillStyle = '#ab003c';
        drawRandomPolygon(ctx, p.x, p.y, p.size, p.sides);
        ctx.fill();
        ctx.restore();
      }

      // 2) UPDATE & DRAW SMOKE TRAIL (WAND EFFECT)
      if (isMouseInside && mousePos.x !== null && mousePos.y !== null) {
        // Spawn a couple smoke particles each frame
        for (let i = 0; i < 2; i++) {
          smokeParticles.current.push(spawnSmokeParticle(mousePos.x, mousePos.y));
        }
      }

      for (let sp of smokeParticles.current) {
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.life -= sp.decay;

        // draw smoke as a radial gradient
        ctx.save();
        ctx.globalAlpha = sp.life; // fade as life decreases
        const grad = ctx.createRadialGradient(sp.x, sp.y, 0, sp.x, sp.y, sp.size);
        grad.addColorStop(0, 'rgba(255,255,255,1)'); // bright center
        grad.addColorStop(1, 'rgba(255,255,255,0)'); // fade to transparent
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
      }
      // remove expired smoke
      smokeParticles.current = smokeParticles.current.filter(sp => sp.life > 0);

      // 3) DRAW GLOWING “WAND” CURSOR
      if (isMouseInside && mousePos.x !== null && mousePos.y !== null) {
        ctx.save();
        const wandGlowSize = 12;
        const glowGrad = ctx.createRadialGradient(
          mousePos.x, mousePos.y, 0,
          mousePos.x, mousePos.y, wandGlowSize
        );
        glowGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        glowGrad.addColorStop(1, 'rgba(255, 0, 200, 0)');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, wandGlowSize, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
      }
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      // Keep pointerEvents: none so it doesn't block your main UI
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        pointerEvents: 'none', 
        cursor: 'none', // hide the system cursor
      }}
    />
  );
};

export default PinkLavaCanvas;
