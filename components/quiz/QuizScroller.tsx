'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getQuizRecommendations } from '@/lib/quiz-data';
import QuizPage from './QuizPage';
import { ChevronDown } from 'lucide-react';

interface QuizScrollerProps {
  initialQuizId: string;
}

export default function QuizScroller({ initialQuizId }: QuizScrollerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [feedIds, setFeedIds] = useState<string[]>(() => {
    const initial = [initialQuizId, ...getQuizRecommendations(initialQuizId, 6).map(q => q.id)];
    return Array.from(new Set(initial));
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const hintHiddenRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);
  const touchMoveYRef = useRef<number | null>(null);
  const urlUpdateTimerRef = useRef<number | null>(null);
  const keyListenerAttachedRef = useRef(false);

  // Seed recommendations on mount
  useEffect(() => {
    const recs = getQuizRecommendations(initialQuizId, 6).map(q => q.id);
    setFeedIds(prev => [...new Set([...(prev || []), ...recs])]);
  }, [initialQuizId]);

  // Update URL when current quiz changes (debounced, no navigation)
  useEffect(() => {
    const currentId = feedIds[currentIndex];
    if (!currentId) return;
    if (urlUpdateTimerRef.current) window.clearTimeout(urlUpdateTimerRef.current);
    urlUpdateTimerRef.current = window.setTimeout(() => {
      const href = `/quiz/${encodeURIComponent(currentId)}`;
      if (typeof window !== 'undefined') {
        window.history.replaceState(window.history.state, '', href);
      }
    }, 150);
    return () => {
      if (urlUpdateTimerRef.current) window.clearTimeout(urlUpdateTimerRef.current);
    };
  }, [currentIndex, feedIds]);

  // Append more when near the end
  useEffect(() => {
    if (feedIds.length - currentIndex > 3) return;
    const lastId = feedIds[feedIds.length - 1];
    const more = getQuizRecommendations(lastId, 6).map(q => q.id);
    setFeedIds(prev => [...new Set([...(prev || []), ...more])]);
  }, [feedIds, currentIndex]);

  // Track which slide is in view using scrollTop and viewport height
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!hintHiddenRef.current) {
          hintHiddenRef.current = true;
          setShowHint(false);
        }
        const vh = el.clientHeight || window.innerHeight;
        const idx = Math.round(el.scrollTop / Math.max(1, vh));
        if (idx !== currentIndex) setCurrentIndex(Math.max(0, Math.min(idx, feedIds.length - 1)));
      });
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    // Capture wheel at the container to avoid inner scroll hijacking
    let wheelBlock = false;
    const onWheelCapture = (e: WheelEvent) => {
      // Prevent inner content from consuming the scroll
      e.preventDefault();
      if (wheelBlock) return;
      wheelBlock = true;
      const dir = e.deltaY > 0 ? 1 : -1;
      const nextIdx = Math.max(0, Math.min(currentIndex + dir, feedIds.length - 1));
      if (nextIdx !== currentIndex) {
        const vh = el.clientHeight || window.innerHeight;
        el.scrollTo({ top: nextIdx * vh, behavior: 'smooth' });
      }
      window.setTimeout(() => { wheelBlock = false; }, 380);
    };
    el.addEventListener('wheel', onWheelCapture, { passive: false, capture: true });
    // Touch capture to avoid inner scroll areas hijacking
    let startY: number | null = null;
    let movedY: number | null = null;
    const onTouchStartCapture = (e: TouchEvent) => {
      startY = e.touches[0]?.clientY ?? null;
      movedY = null;
    };
    const onTouchMoveCapture = (e: TouchEvent) => {
      movedY = e.touches[0]?.clientY ?? null;
    };
    const onTouchEndCapture = () => {
      if (startY == null || movedY == null) return;
      const delta = (movedY - startY);
      const threshold = 35;
      if (Math.abs(delta) < threshold) return;
      const dir = delta < 0 ? 1 : -1;
      const nextIdx = Math.max(0, Math.min(currentIndex + dir, feedIds.length - 1));
      if (nextIdx !== currentIndex) {
        const vh = el.clientHeight || window.innerHeight;
        el.scrollTo({ top: nextIdx * vh, behavior: 'smooth' });
      }
    };
    el.addEventListener('touchstart', onTouchStartCapture, { capture: true });
    el.addEventListener('touchmove', onTouchMoveCapture, { capture: true });
    el.addEventListener('touchend', onTouchEndCapture, { capture: true });

    // Global listeners to guarantee mid-game gestures are recognized
    const shouldIgnoreTarget = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false;
      if (target.closest('input, textarea, select, [contenteditable="true"], [data-no-scroll]')) return true;
      return false;
    };
    const onGlobalWheel = (e: WheelEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) return;
      if (shouldIgnoreTarget(e.target)) return;
      // mirror container handler
      const threshold = 25;
      if (Math.abs(e.deltaY) < threshold) return;
      e.preventDefault();
      const dir = e.deltaY > 0 ? 1 : -1;
      const nextIdx = Math.max(0, Math.min(currentIndex + dir, feedIds.length - 1));
      if (nextIdx === currentIndex) return;
      const vh = containerRef.current.clientHeight || window.innerHeight;
      containerRef.current.scrollTo({ top: nextIdx * vh, behavior: 'smooth' });
    };
    const onGlobalTouchStart = (e: TouchEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) return;
      if (shouldIgnoreTarget(e.target)) return;
      startY = e.touches[0]?.clientY ?? null;
      movedY = null;
    };
    const onGlobalTouchMove = (e: TouchEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) return;
      if (shouldIgnoreTarget(e.target)) return;
      movedY = e.touches[0]?.clientY ?? null;
    };
    const onGlobalTouchEnd = () => {
      if (startY == null || movedY == null) return;
      const delta = (movedY - startY);
      const threshold = 25;
      if (Math.abs(delta) < threshold) return;
      const dir = delta < 0 ? 1 : -1;
      const nextIdx = Math.max(0, Math.min(currentIndex + dir, feedIds.length - 1));
      if (nextIdx === currentIndex) return;
      const vh = containerRef.current?.clientHeight || window.innerHeight;
      containerRef.current?.scrollTo({ top: nextIdx * vh, behavior: 'smooth' });
    };
    window.addEventListener('wheel', onGlobalWheel, { passive: false, capture: true });
    window.addEventListener('touchstart', onGlobalTouchStart, { capture: true });
    window.addEventListener('touchmove', onGlobalTouchMove, { capture: true });
    window.addEventListener('touchend', onGlobalTouchEnd, { capture: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('wheel', onWheelCapture, { capture: true } as any);
      el.removeEventListener('touchstart', onTouchStartCapture, { capture: true } as any);
      el.removeEventListener('touchmove', onTouchMoveCapture, { capture: true } as any);
      el.removeEventListener('touchend', onTouchEndCapture, { capture: true } as any);
      window.removeEventListener('wheel', onGlobalWheel, { capture: true } as any);
      window.removeEventListener('touchstart', onGlobalTouchStart, { capture: true } as any);
      window.removeEventListener('touchmove', onGlobalTouchMove, { capture: true } as any);
      window.removeEventListener('touchend', onGlobalTouchEnd, { capture: true } as any);
    };
  }, [currentIndex, feedIds.length]);

  // Auto-hide the hint after a few seconds if no interaction
  useEffect(() => {
    if (!showHint) return;
    const t = window.setTimeout(() => {
      hintHiddenRef.current = true;
      setShowHint(false);
    }, 4000);
    return () => window.clearTimeout(t);
  }, [showHint]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full overflow-y-auto snap-y snap-mandatory touch-pan-y overscroll-y-contain scroll-smooth"
      aria-label="Quiz scroller"
      onPointerDown={() => { if (!hintHiddenRef.current) { hintHiddenRef.current = true; setShowHint(false); } }}
    >
      {feedIds.map((id, i) => {
        const visible = Math.abs(i - currentIndex) <= 1;
        return (
          <section key={id} className="min-h-screen w-full snap-start snap-always overflow-hidden" style={{ contain: 'content' as any }}>
            {visible ? (
              <QuizPage quizId={id} />
            ) : (
              <div className="h-screen w-full" />
            )}
          </section>
        );
      })}

      {/* UX hint */}
      <div className={`pointer-events-none fixed bottom-4 left-0 right-0 flex justify-center transition-opacity duration-700 ${showHint ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center gap-2 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
          <span>Swipe up for next quiz</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </div>
    </div>
  );
}


