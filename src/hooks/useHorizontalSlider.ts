import { useRef, useEffect, useCallback, useState } from "react";
import gsap from "gsap";

export function useHorizontalSlider() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);

  useEffect(() => {
    if (trackRef.current) {
      gsap.set(trackRef.current, { x: 0 });
      setTrackWidth(trackRef.current.scrollWidth);
    }
  }, []);

  const slideBy = useCallback(
    (direction: "left" | "right") => {
      if (!viewportRef.current || !trackRef.current) return;

      const viewportWidth = viewportRef.current.offsetWidth;
      const track = trackRef.current;
      const currentX = gsap.getProperty(track, "x") as number;

      // Ensure maxScroll is always negative or zero
      const maxScroll = Math.min(viewportWidth - trackWidth, 0);

      let distance = viewportWidth * 0.8;
      if (direction === "right") {
        distance = Math.min(distance, Math.abs(maxScroll - currentX));
      } else {
        distance = Math.min(distance, Math.abs(currentX));
      }

      const nextX =
        direction === "left"
          ? Math.min(currentX + distance, 0)
          : Math.max(currentX - distance, maxScroll);

      gsap.to(track, { x: nextX, duration: 0.8, ease: "power3.out" });
    },
    [trackWidth]
  );

  const handleSwipe = useCallback(
    (deltaX: number) => {
      if (!trackRef.current || !viewportRef.current) return;

      const track = trackRef.current;
      const currentX = gsap.getProperty(track, "x") as number;
      const viewportWidth = viewportRef.current.offsetWidth;
      const maxScroll = Math.min(viewportWidth - trackWidth, 0);

      let nextX = currentX + deltaX;
      nextX = Math.min(nextX, 0);
      nextX = Math.max(nextX, maxScroll);

      gsap.to(track, { x: nextX, duration: 0.4, ease: "power3.out" });
    },
    [trackWidth]
  );

  return { viewportRef, trackRef, slideBy, handleSwipe };
}
