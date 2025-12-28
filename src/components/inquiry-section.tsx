"use client";


import Link from "next/link";
import { useState } from "react";
// import InquiryModal from "./inquiry-modal";



const OPTIONS = [
  { id: "work", label: "Work Inquiry" },
  { id: "contact", label: "Get in Touch" },
];

export default function InquirySection() {
  // const [activeType, setActiveType] = useState<string | null>(null);

  return (
    <section className="h-screen flex flex-col justify-center px-6 md:px-24 text-white">
      <h2 className="text-2xl md:text-4xl font-bold mb-1">INQUIRIES</h2>

      <p className="text-gray-400 max-w-xl mb-10 text-[16px]">
        For collaborations and inquiries, please select an option below:
      </p>

      <div className="flex flex-wrap gap-4">
        {OPTIONS.map((opt) => (
          <Link
            href="mailto:contactymk30@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            key={opt.id}
            // onClick={() => setActiveType(opt.id)}
            className="px-6 py-3 border border-white/20 hover:border-white transition text-sm uppercase tracking-wide"
          >
            {opt.label}
          </Link>
        ))}
      </div>

      {/* <p className="mt-6 text-sm text-gray-500">
        Or email directly at{" "}
        <a
          href="mailto:info@abelpaulgeorge.com"
          className="text-white underline"
        >
          contactymk30@gmail.com
        </a>
      </p> */}

      {/* {activeType && (
        <InquiryModal
          type={activeType}
          onClose={() => setActiveType(null)}
        />
      )} */}
    </section>
  );
}
