'use client';

import { useRef, useEffect } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  radius: number;
  isHovered: boolean;
}

export const NeuralNetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const initializedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const REPULSION_RADIUS = 120;
    const REPULSION_FORCE = 6;
    const CONNECTION_DIST = 170;

    const initNodes = () => {
      // Denser web → reads more like a real neural network (same look & physics).
      // Capped so the O(n²) connection pass stays smooth on large/4K screens.
      const count = Math.min(420, Math.floor((canvas.width * canvas.height) / 6500));
      nodesRef.current = [];
      for (let i = 0; i < count; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        nodesRef.current.push({
          x, y,
          baseX: x, baseY: y,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1.5 + 1,
          isHovered: false,
        });
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (!initializedRef.current) {
        initNodes();
        initializedRef.current = true;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      const nodes = nodesRef.current;

      // Update node physics
      for (const node of nodes) {
        const dx = node.x - mouse.x;
        const dy = node.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        node.isHovered = dist < REPULSION_RADIUS;

        if (dist < REPULSION_RADIUS && dist > 0) {
          // Repulsion: push node away from mouse
          const force = (REPULSION_RADIUS - dist) / REPULSION_RADIUS;
          node.vx += (dx / dist) * force * REPULSION_FORCE * 0.1;
          node.vy += (dy / dist) * force * REPULSION_FORCE * 0.1;
        }

        // Return to base with spring
        node.vx += (node.baseX - node.x) * 0.025;
        node.vy += (node.baseY - node.y) * 0.025;

        // Damping
        node.vx *= 0.88;
        node.vy *= 0.88;

        node.x += node.vx;
        node.y += node.vy;

        // Clamp to canvas
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST);
            const highlighted = a.isHovered || b.isHovered;

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);

            if (highlighted) {
              ctx.strokeStyle = `rgba(167, 139, 250, ${opacity * 0.9})`;
              ctx.lineWidth = 1.5;
              ctx.shadowBlur = 8;
              ctx.shadowColor = 'rgba(139, 92, 246, 0.6)';
            } else {
              ctx.strokeStyle = `rgba(109, 40, 217, ${opacity * 0.25})`;
              ctx.lineWidth = 0.8;
              ctx.shadowBlur = 0;
            }
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.isHovered ? node.radius * 2 : node.radius, 0, Math.PI * 2);

        if (node.isHovered) {
          ctx.fillStyle = '#c4b5fd';
          ctx.shadowBlur = 16;
          ctx.shadowColor = '#7c3aed';
        } else {
          ctx.fillStyle = 'rgba(139, 92, 246, 0.5)';
          ctx.shadowBlur = 0;
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
};
