"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router";

const DISMISSED_KEY = "gp-announcement-dismissed-2026-q2";

export function AnnouncementBar() {
  const [visible, setVisible] = useState(false);

  // Hydrate from localStorage after mount to avoid SSR mismatch
  useEffect(() => {
    const dismissed = localStorage.getItem(DISMISSED_KEY);
    if (!dismissed) {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    localStorage.setItem(DISMISSED_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="relative flex h-9 items-center justify-center gap-2 bg-dark-1 text-dark-12 text-[13px] font-body">
      <span className="text-dark-9">
        Q2 2026: opening to early-access partners in India.
      </span>
      <span className="text-dark-7" aria-hidden>·</span>
      <Link
        to="/waitlist"
        className="font-medium text-primary hover:text-primary/80 transition-colors no-underline"
      >
        Join the waitlist →
      </Link>
      <button
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute right-4 text-dark-9 hover:text-dark-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-dark-1 transition-colors leading-none p-1 text-body"
      >
        ×
      </button>
    </div>
  );
}
