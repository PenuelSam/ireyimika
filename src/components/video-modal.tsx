import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

export default function VideoModal({
  video,
  description,
  onClose,
}: {
  video: {
    video_url: string;
    title: string;
  };
  description?: string;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const [showDesc, setShowDesc] = useState(false);

  // Fade in modal
  useEffect(() => {
    gsap.fromTo(
      modalRef.current,
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

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="md:w-[80vw] w-full md:h-[70vh] md:max-h-[70vh] max-h-[50vh] aspect-video bg-black/50 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          src={video.video_url}
          controls
          autoPlay
          className="w-full h-full rounded-lg object-contain"
        />
      </div>

      {/* Toggle button */}
      {description && (
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
                        
            hover:-translate-y-0.5`
          }
        >
          {showDesc ? <span className="flex items-center gap-1">Hide Caption <MdArrowDropUp fontSize={30}/></span>  : <span className="flex items-center gap-1">Show Caption <MdArrowDropDown fontSize={30}/></span>}
        </button>
      )}

      {/* Animated description container */}
      <div
        ref={descRef}
        className="overflow-hidden max-w-2xl text-center mt-2"
        style={{
          height: 0,
          opacity: 0,
          visibility: "hidden",
        }}
      >
        <p className="text-white  ">{description}</p>
      </div>
    </div>
  );
}
