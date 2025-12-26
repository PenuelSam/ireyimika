import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

type Album = {
  id: string;
  title: string;
  description?: string;
  images: { id: string; image_url: string }[];
};

export default function ImageModal({
  album,
  onClose,
}: {
  album: Album;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [showDesc, setShowDesc] = useState(false);

  // Fade in overlay
  useEffect(() => {
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: "power2.out" }
    );
  }, []);

  // Animate description in/out
  useEffect(() => {
    if (!descRef.current) return;

    if (showDesc) {
      gsap.to(descRef.current, {
        height: "auto",
        y: 0,
        autoAlpha: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(descRef.current, {
        height: 0,
        y: 20,
        autoAlpha: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [showDesc]);

  if (!album?.images?.length) return null;

  const next = () => setIndex((prev) => (prev + 1) % album.images.length);
  const prev = () =>
    setIndex((prev) => (prev === 0 ? album.images.length - 1 : prev - 1));

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-center p-4 pb-5"
      onClick={onClose}
    >
      <div
        className="relative w-[90%] md:w-[40%] md:h-[90%] h-[60%] bg-[#1f1e1e] rounded-lg flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={album.images[index].image_url}
          alt={album.title}
          quality={100}
          fill
          className="w-full h-full object-cover rounded-lg"
        />

        {/* Prev */}
        <button
          onClick={prev}
          className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
        >
          ◀
        </button>

        {/* Next */}
        <button
          onClick={next}
          className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
        >
          ▶
        </button>
      </div>

     {/* Toggle button */}
      {album.description && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowDesc((prev) => !prev);
          }}
          className={`mt-4 px-4 py-2 rounded cursor-pointer ${
                  showDesc
                    ? "text-white "
                    : " text-[#919498] "
                }
                
                hover:-translate-y-0.5`}
        >
          {showDesc ? <span className="flex items-center gap-1">Hide Caption <MdArrowDropUp fontSize={30}/></span>  : <span className="flex items-center gap-1">Show Caption <MdArrowDropDown fontSize={30}/></span>}
        </button>
      )}

      {/* Animated description container */}
      <div
        ref={descRef}
        className=" max-w-2xl text-center mt-2"
        style={{
          height: 0,
          opacity: 0,
          visibility: "hidden",
        }}
      >
        <p className="text-white">{album.description}</p>
      </div>
    </div>
  );
}
