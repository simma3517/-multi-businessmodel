"use client";

import React, { useEffect, useRef } from "react";

interface AiDot {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  glowColor: string;
  pulsePhase: number;
  pulseSpeed: number;
  category: string; // Telemetry tag shown on hover
  metric: string;
}

interface DataPacket {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
  color: string;
}

interface ClickPulse {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

const AI_TELEMETRY_TAGS = [
  { category: "SALES AGENT", metric: "99.4% Pipeline Sync" },
  { category: "FINANCE AGENT", metric: "Unit Margins OK" },
  { category: "INVENTORY AGENT", metric: "Velocity 1.4x" },
  { category: "SUPPORT AGENT", metric: "Sentiment 98%" },
  { category: "HR AGENT", metric: "Capacity Peak" },
  { category: "NEURAL SYNAPSE", metric: "Bandwidth 10 Gbps" },
  { category: "DATA STREAM", metric: "Autonomous Feed" },
  { category: "ORCHESTRATOR", metric: "Strategy Active" },
];

export const AiMeshBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 160,
      active: false,
    };

    let dots: AiDot[] = [];
    let packets: DataPacket[] = [];
    let clickPulses: ClickPulse[] = [];

    const initScene = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const isMobile = width < 768;
      const totalDots = isMobile ? 38 : 75;
      dots = [];

      for (let i = 0; i < totalDots; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const tag = AI_TELEMETRY_TAGS[i % AI_TELEMETRY_TAGS.length];
        const isCyan = Math.random() > 0.4;

        dots.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * (isMobile ? 0.35 : 0.5),
          vy: (Math.random() - 0.5) * (isMobile ? 0.35 : 0.5),
          radius: Math.random() * 1.8 + 1.8,
          color: isCyan ? "rgba(56, 189, 248, " : "rgba(129, 140, 248, ",
          glowColor: isCyan ? "rgba(56, 189, 248, 0.9)" : "rgba(129, 140, 248, 0.9)",
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.03 + 0.015,
          category: tag.category,
          metric: tag.metric,
        });
      }

      packets = [];
      clickPulses = [];
    };

    initScene();

    const handleResize = () => {
      initScene();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
        mouse.active = true;
      }
    };

    const handleClick = (e: MouseEvent) => {
      clickPulses.push({
        x: e.clientX,
        y: e.clientY,
        radius: 4,
        maxRadius: 180,
        alpha: 0.8,
      });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });

    let tick = 0;

    const render = () => {
      tick++;

      // Smooth cursor interpolation
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.12;
        mouse.y += (mouse.targetY - mouse.y) * 0.12;
      } else {
        mouse.x = -1000;
        mouse.y = -1000;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const isMobile = width < 768;
      const maxConnectDist = isMobile ? 110 : 155;
      const activeConnections: { i: number; j: number }[] = [];

      // -------------------------------------------------------------
      // 1. UPDATE AND DRAW MOVING DOTS
      // -------------------------------------------------------------
      let closestDotIdx = -1;
      let closestDotDist = 99999;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        if (!prefersReducedMotion) {
          dot.x += dot.vx;
          dot.y += dot.vy;

          if (dot.x < 10) { dot.x = 10; dot.vx *= -1; }
          else if (dot.x > width - 10) { dot.x = width - 10; dot.vx *= -1; }

          if (dot.y < 10) { dot.y = 10; dot.vy *= -1; }
          else if (dot.y > height - 10) { dot.y = height - 10; dot.vy *= -1; }
        }

        // Distance from cursor
        let inCursorRange = false;
        let cursorInfluence = 0;

        if (mouse.active) {
          const dx = mouse.x - dot.x;
          const dy = mouse.y - dot.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            inCursorRange = true;
            cursorInfluence = 1 - dist / mouse.radius;

            // Gentle magnetic attraction towards cursor
            dot.x += (dx / dist) * cursorInfluence * 1.5;
            dot.y += (dy / dist) * cursorInfluence * 1.5;

            if (dist < closestDotDist) {
              closestDotDist = dist;
              closestDotIdx = i;
            }
          }
        }

        // Pulse calculation
        const pulse = Math.sin(tick * dot.pulseSpeed + dot.pulsePhase);
        const baseAlpha = 0.4 + pulse * 0.2;
        const currentAlpha = inCursorRange ? Math.min(1, baseAlpha + cursorInfluence * 0.6) : baseAlpha;
        const currentRadius = inCursorRange ? dot.radius + cursorInfluence * 2.5 : dot.radius;

        // Draw Dot
        ctx.save();
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `${dot.color}${currentAlpha})`;

        if (inCursorRange) {
          ctx.shadowColor = dot.glowColor;
          ctx.shadowBlur = 14 * cursorInfluence;
        } else {
          ctx.shadowColor = dot.glowColor;
          ctx.shadowBlur = 4;
        }
        ctx.fill();

        // If hovered by cursor, draw target ring around the dot
        if (inCursorRange && cursorInfluence > 0.4) {
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, currentRadius + 6 + pulse * 2, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(56, 189, 248, ${cursorInfluence * 0.7})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.restore();

        // Connect dots to other nearby dots
        for (let j = i + 1; j < dots.length; j++) {
          const other = dots[j];
          const dx = dot.x - other.x;
          const dy = dot.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDist) {
            activeConnections.push({ i, j });
            const lineAlpha = (1 - dist / maxConnectDist) * 0.22;

            ctx.beginPath();
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      }

      // -------------------------------------------------------------
      // 2. CURSOR INTERACTIVE ENERGY BEAMS & RADAR RETICLE
      // -------------------------------------------------------------
      if (mouse.active) {
        // Draw ambient cursor radar rings
        ctx.save();
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 45, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(56, 189, 248, 0.25)";
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 6]);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 18, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(129, 140, 248, 0.4)";
        ctx.lineWidth = 1.2;
        ctx.setLineDash([]);
        ctx.stroke();
        ctx.restore();

        // Connect cursor directly to all dots within radius with glowing beams
        for (let i = 0; i < dots.length; i++) {
          const dot = dots[i];
          const dx = mouse.x - dot.x;
          const dy = mouse.y - dot.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const beamAlpha = (1 - dist / mouse.radius) * 0.65;

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(dot.x, dot.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${beamAlpha})`;
            ctx.lineWidth = 1.2;
            ctx.shadowColor = "rgba(56, 189, 248, 0.8)";
            ctx.shadowBlur = 8;
            ctx.stroke();
            ctx.restore();
          }
        }

        // Show Sleek AI Telemetry Card when cursor gets near the closest dot
        if (closestDotIdx !== -1 && closestDotDist < 95 && !isMobile) {
          const activeDot = dots[closestDotIdx];
          const tooltipX = activeDot.x + 14;
          const tooltipY = activeDot.y - 32;

          ctx.save();
          // Tooltip container box
          const boxWidth = 148;
          const boxHeight = 38;
          ctx.fillStyle = "rgba(12, 16, 26, 0.88)";
          ctx.strokeStyle = "rgba(56, 189, 248, 0.5)";
          ctx.lineWidth = 1;
          ctx.shadowColor = "rgba(56, 189, 248, 0.35)";
          ctx.shadowBlur = 10;

          ctx.beginPath();
          ctx.roundRect(tooltipX, tooltipY, boxWidth, boxHeight, 6);
          ctx.fill();
          ctx.stroke();

          // Tooltip Text
          ctx.font = "bold 9px 'JetBrains Mono', monospace";
          ctx.fillStyle = "#38BDF8";
          ctx.textAlign = "left";
          ctx.fillText(`● ${activeDot.category}`, tooltipX + 8, tooltipY + 14);

          ctx.font = "8px 'JetBrains Mono', monospace";
          ctx.fillStyle = "rgba(226, 232, 240, 0.85)";
          ctx.fillText(activeDot.metric, tooltipX + 8, tooltipY + 28);

          ctx.restore();
        }
      }

      // -------------------------------------------------------------
      // 3. GLOWING DATA PACKETS TRAVERSING BETWEEN CONNECTED DOTS
      // -------------------------------------------------------------
      if (tick % 24 === 0 && activeConnections.length > 0 && packets.length < 22) {
        const randConn = activeConnections[Math.floor(Math.random() * activeConnections.length)];
        packets.push({
          fromIdx: randConn.i,
          toIdx: randConn.j,
          progress: 0,
          speed: 0.018 + Math.random() * 0.02,
          color: Math.random() > 0.5 ? "#38BDF8" : "#818CF8",
        });
      }

      for (let k = packets.length - 1; k >= 0; k--) {
        const p = packets[k];
        p.progress += p.speed;

        if (p.progress >= 1) {
          packets.splice(k, 1);
          continue;
        }

        const d1 = dots[p.fromIdx];
        const d2 = dots[p.toIdx];
        if (!d1 || !d2) {
          packets.splice(k, 1);
          continue;
        }

        const px = d1.x + (d2.x - d1.x) * p.progress;
        const py = d1.y + (d2.y - d1.y) * p.progress;

        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      }

      // -------------------------------------------------------------
      // 4. CLICK RIPPLE WAVES
      // -------------------------------------------------------------
      for (let c = clickPulses.length - 1; c >= 0; c--) {
        const pulse = clickPulses[c];
        pulse.radius += 3.5;
        pulse.alpha = Math.max(0, pulse.alpha - 0.02);

        if (pulse.alpha <= 0 || pulse.radius >= pulse.maxRadius) {
          clickPulses.splice(c, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56, 189, 248, ${pulse.alpha})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();
        ctx.restore();
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-90 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
};
