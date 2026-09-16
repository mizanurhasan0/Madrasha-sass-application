"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import { Pause, Play, Sparkles } from "lucide-react";
import { useT } from "@/lib/i18n/locale-provider";
import styles from "./login-atmosphere.module.css";

// Fixed positions keep the server and client render identical.
const stars = Array.from({ length: 20 }, (_, i) => ({
  left: `${(i * 37 + 7) % 100}%`,
  top: `${(i * 23 + 4) % 100}%`,
  "--delay": `${-(i % 7)}s`,
  "--size": `${i % 3 === 0 ? 12 : 5}px`,
})) as CSSProperties[];

export function LoginAtmosphere({ children }: { children: ReactNode }) {
  const panel = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const reducedMotion = useRef(false);
  const nextBurst = useRef(0);
  const [paused, setPaused] = useState(false);
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([]);
  const t = useT();

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { reducedMotion.current = query.matches; };
    update();
    query.addEventListener("change", update);
    return () => {
      query.removeEventListener("change", update);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  function moveLight(event: PointerEvent<HTMLDivElement>) {
    if (paused || reducedMotion.current || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      panel.current?.style.setProperty("--pointer-x", `${x}px`);
      panel.current?.style.setProperty("--pointer-y", `${y}px`);
      frame.current = null;
    });
  }

  function resetLight() {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    panel.current?.style.removeProperty("--pointer-x");
    panel.current?.style.removeProperty("--pointer-y");
  }

  function addSparkles(x: number, y: number) {
    if (paused || reducedMotion.current) return;
    const id = nextBurst.current++;
    setBursts((current) => [...current.slice(-3), { id, x, y }]);
  }

  return (
    <div
      ref={panel}
      className={styles.panel}
      data-paused={paused}
      onPointerMove={moveLight}
      onPointerLeave={resetLight}
      onPointerDown={(event) => {
        if (event.button !== 0 || (event.target as HTMLElement).closest("a, button")) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        addSparkles(event.clientX - bounds.left, event.clientY - bounds.top);
      }}
    >
      <div className={styles.scenery} aria-hidden="true">
        <div className={styles.aurora} />
        <div className={styles.glow} />
        <div className={styles.grid} />
        <div className={`${styles.rosette} ${styles.rosetteTop}`}>
          <Rosette />
        </div>
        <div className={`${styles.rosette} ${styles.rosetteBottom}`}>
          <Rosette />
        </div>
        {stars.map((style, i) => <span key={i} className={styles.star} style={style} />)}
        {bursts.map((burst) => (
          <span
            key={burst.id}
            className={styles.burst}
            style={{ left: burst.x, top: burst.y }}
            onAnimationEnd={(event) => {
              if (event.target === event.currentTarget) {
                setBursts((current) => current.filter(({ id }) => id !== burst.id));
              }
            }}
          >
            {Array.from({ length: 8 }, (_, i) => (
              <span key={i} className={styles.ray} style={{ "--angle": `${i * 45}deg` } as CSSProperties} />
            ))}
          </span>
        ))}
      </div>

      <div className={styles.content}>{children}</div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.sparkleButton}
          disabled={paused}
          onClick={() => {
            if (!panel.current) return;
            const { width, height } = panel.current.getBoundingClientRect();
            addSparkles(width * 0.16, height * 0.22);
            addSparkles(width * 0.85, height * 0.7);
          }}
        >
          <Sparkles size={14} aria-hidden="true" />
          {t("login.addSparkle")}
        </button>
        <span className={styles.controlDivider} aria-hidden="true" />
        <button
          type="button"
          className={styles.pauseButton}
          aria-label={t(paused ? "login.resumeAnimation" : "login.pauseAnimation")}
          title={t(paused ? "login.resumeAnimation" : "login.pauseAnimation")}
          onClick={() => {
            setPaused((current) => !current);
            setBursts([]);
            resetLight();
          }}
        >
          {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}

function Rosette() {
  return (
    <svg viewBox="0 0 240 240" fill="none" focusable="false">
      <circle cx="120" cy="120" r="116" stroke="currentColor" strokeDasharray="2 9" />
      <circle cx="120" cy="120" r="92" stroke="currentColor" />
      {[0, 30, 60, 90, 120, 150].map((angle) => (
        <ellipse key={angle} cx="120" cy="120" rx="44" ry="92" stroke="currentColor" transform={`rotate(${angle} 120 120)`} />
      ))}
      <path d="m120 100 5 15 15 5-15 5-5 15-5-15-15-5 15-5Z" fill="currentColor" />
    </svg>
  );
}
