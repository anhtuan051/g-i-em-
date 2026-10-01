import React, { useEffect, useRef } from 'react';

interface HeartParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  fadeSpeed: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
}

export const BackgroundStarsAndHearts: React.FC = () => {
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
      initStars();
    };

    window.addEventListener('resize', handleResize);

    // Stars setup
    interface Star {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      twinkleSpeed: number;
      twinkleDir: number;
    }

    const stars: Star[] = [];
    const numStars = Math.min(140, Math.floor((width * height) / 10000));

    const initStars = () => {
      stars.length = 0;
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.5 + 0.4,
          alpha: Math.random() * 0.7 + 0.2,
          twinkleSpeed: Math.random() * 0.015 + 0.005,
          twinkleDir: Math.random() > 0.5 ? 1 : -1,
        });
      }
    };
    initStars();

    // Floating Hearts setup
    const hearts: HeartParticle[] = [];
    const heartColors = [
      'rgba(244, 63, 94, 0.45)', // Rose
      'rgba(251, 113, 133, 0.4)', // Soft Rose
      'rgba(225, 29, 72, 0.35)',  // Crimson
      'rgba(244, 114, 182, 0.35)', // Pink
      'rgba(253, 186, 116, 0.3)', // Warm peach
    ];

    const createHeart = (customX?: number, customY?: number): HeartParticle => {
      return {
        x: customX ?? Math.random() * width,
        y: customY ?? (height + 20),
        size: Math.random() * 14 + 10,
        speedY: Math.random() * 0.7 + 0.4,
        speedX: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.5 + 0.3,
        fadeSpeed: Math.random() * 0.001 + 0.0005,
        rotation: (Math.random() - 0.5) * 0.5,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        color: heartColors[Math.floor(Math.random() * heartColors.length)],
      };
    };

    // Pre-populate some hearts across the screen
    for (let i = 0; i < 22; i++) {
      const h = createHeart();
      h.y = Math.random() * height;
      hearts.push(h);
    }

    // Interactive mouse trail for stardust and occasional heart
    let lastMouseHeart = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMouseHeart > 350) {
        if (hearts.length < 40) {
          hearts.push(createHeart(e.clientX + (Math.random() - 0.5) * 20, e.clientY + 10));
        }
        lastMouseHeart = now;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Draw heart shape path on canvas
    const drawHeart = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      alpha: number,
      rotation: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.globalAlpha = Math.max(0, Math.min(1, alpha));
      context.fillStyle = color;
      context.beginPath();

      const d = size;
      // Parametric curve or bezier heart
      context.moveTo(0, 0);
      context.bezierCurveTo(-d / 2, -d / 2, -d, d / 3, 0, d);
      context.bezierCurveTo(d, d / 3, d / 2, -d / 2, 0, 0);

      context.closePath();
      context.fill();
      context.restore();
    };

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.alpha += star.twinkleSpeed * star.twinkleDir;
        if (star.alpha > 0.9) {
          star.alpha = 0.9;
          star.twinkleDir = -1;
        } else if (star.alpha < 0.15) {
          star.alpha = 0.15;
          star.twinkleDir = 1;
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // Extra cross-twinkle on bright stars
        if (star.alpha > 0.75 && star.radius > 1.2) {
          ctx.strokeStyle = `rgba(255, 240, 220, ${star.alpha * 0.4})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(star.x - 4, star.y);
          ctx.lineTo(star.x + 4, star.y);
          ctx.moveTo(star.x, star.y - 4);
          ctx.lineTo(star.x, star.y + 4);
          ctx.stroke();
        }
      }

      // 2. Spawn and update hearts
      if (hearts.length < 24 && Math.random() < 0.05) {
        hearts.push(createHeart());
      }

      for (let i = hearts.length - 1; i >= 0; i--) {
        const heart = hearts[i];
        heart.y -= heart.speedY;
        heart.x += heart.speedX;
        heart.rotation += heart.rotationSpeed;
        heart.opacity -= heart.fadeSpeed;

        drawHeart(
          ctx,
          heart.x,
          heart.y,
          heart.size,
          heart.color,
          heart.opacity,
          heart.rotation
        );

        // Remove if off screen or faded
        if (heart.y < -30 || heart.opacity <= 0) {
          hearts.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep Romantic Night Sky Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070810] via-[#0e0f1f] to-[#140b1a] opacity-95" />
      {/* Soft Nebula Blooms */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-purple-950/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-3/4 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-pink-900/10 rounded-full blur-[130px] pointer-events-none" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
