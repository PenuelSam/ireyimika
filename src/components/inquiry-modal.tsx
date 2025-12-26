// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";

// const COPY: Record<string, { title: string; subtitle: string }> = {
//   invite: {
//     title: "Invite to Speak",
//     subtitle: "Request Abel for a talk, panel, or event.",
//   },
//   work: {
//     title: "Work Inquiry",
//     subtitle: "Tell us about your project or collaboration.",
//   },
//   portfolio: {
//     title: "Request Portfolio",
//     subtitle: "Request access to selected works.",
//   },
//   contact: {
//     title: "Get in Touch",
//     subtitle: "Reach out with questions or ideas.",
//   },
// };

// export default function InquiryModal({
//   type,
//   onClose,
// }: {
//   type: string;
//   onClose: () => void;
// }) {
//   const ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     gsap.fromTo(
//       ref.current,
//       { opacity: 0, y: 20 },
//       { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
//     );
//   }, []);

//   const copy = COPY[type];

//   return (
//     <div
//       className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4"
//       onClick={onClose}
//     >
//       <div
//         ref={ref}
//         onClick={(e) => e.stopPropagation()}
//         className="w-full max-w-lg bg-black border border-white/10 rounded-lg p-6"
//       >
//         <div className="flex justify-between items-center mb-6">
//           <h3 className="text-xl font-semibold">{copy.title}</h3>
//           <button onClick={onClose} className="text-white/60 hover:text-white">
//             ✕
//           </button>
//         </div>

//         <p className="text-gray-400 mb-6">{copy.subtitle}</p>

//         <form className="space-y-4">
//           <input
//             name="name"
//             placeholder="Your name"
//             required
//             className="w-full bg-black border border-white/20 p-3 text-sm"
//           />

//           <input
//             name="email"
//             type="email"
//             placeholder="your.email@example.com"
//             required
//             className="w-full bg-black border border-white/20 p-3 text-sm"
//           />

//           <input
//             name="company"
//             placeholder="Company / Organization"
//             className="w-full bg-black border border-white/20 p-3 text-sm"
//           />

//           <textarea
//             name="message"
//             placeholder="Provide details about your request..."
//             rows={4}
//             required
//             className="w-full bg-black border border-white/20 p-3 text-sm"
//           />

//           <button
//             type="submit"
//             className="w-full bg-white text-black py-3 text-sm font-medium"
//           >
//             Send Message
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
