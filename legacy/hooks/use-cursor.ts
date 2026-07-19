"use client";

import { useEffect, useRef } from "react";

interface CursorPosition {
  x: number;
  y: number;
}

export function useCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef<CursorPosition>({ x: 0, y: 0 });
  const targetPositionRef = useRef<CursorPosition>({ x: 0, y: 0 });

  useEffect(() => {
    // Create cursor element if it doesn't exist
    if (!cursorRef.current) {
      const cursor = document.createElement("div");
      cursor.id = "custom-cursor";
      // Flat editorial cursor (v2): a small light dot that inverts over
      // content via mix-blend difference, no glow. Grows + turns accent on
      // interactive elements.
      cursor.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: #f5f5f3;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        opacity: 0.9;
        transform: translate(-50%, -50%);
        transition: width 0.2s cubic-bezier(0.16,1,0.3,1), height 0.2s cubic-bezier(0.16,1,0.3,1), background 0.2s;
      `;
      document.body.appendChild(cursor);
      cursorRef.current = cursor;
    }

    const cursor = cursorRef.current;

    // Hide default cursor
    document.body.style.cursor = "none";

    const handleMouseMove = (e: MouseEvent) => {
      targetPositionRef.current = { x: e.clientX, y: e.clientY };

      // Smooth follow animation
      const dx = targetPositionRef.current.x - positionRef.current.x;
      const dy = targetPositionRef.current.y - positionRef.current.y;

      positionRef.current.x += dx * 0.15;
      positionRef.current.y += dy * 0.15;

      cursor.style.left = `${positionRef.current.x}px`;
      cursor.style.top = `${positionRef.current.y}px`;
    };

    const handleMouseEnterInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.classList.contains("interactive")
      ) {
        cursor.style.width = "28px";
        cursor.style.height = "28px";
        cursor.style.background = "#f57a28";
        cursor.style.mixBlendMode = "normal";
      }
    };

    const handleMouseLeaveInteractive = () => {
      cursor.style.width = "10px";
      cursor.style.height = "10px";
      cursor.style.background = "#f5f5f3";
      cursor.style.mixBlendMode = "difference";
    };

    const handleMouseLeave = () => {
      cursor.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      cursor.style.opacity = "0.9";
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnterInteractive, true);
    document.addEventListener("mouseleave", handleMouseLeaveInteractive, true);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener(
        "mouseenter",
        handleMouseEnterInteractive,
        true,
      );
      document.removeEventListener(
        "mouseleave",
        handleMouseLeaveInteractive,
        true,
      );
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.body.style.cursor = "auto";
    };
  }, []);
}
