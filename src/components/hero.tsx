"use client";

import React, { useState } from "react";
import { FaInstagram } from "react-icons/fa6";
import { FiLinkedin, FiMenu } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import Link from "next/link";

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const marqueeItems = [
    "Ile Ijo",
    "Engage Space",
    "Redlight Fashion Room",
    "Saint Moriartyy",
    "Section Studio",
  ];

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      {/* Header */}
      <div className="flex text-white items-center w-full justify-between">
        <h1 className="text-[20px] uppercase tracking-[-0.02em]">
          adunola&nbsp; ireyimika
        </h1>
        <div className="text-[20px] flex gap-4">
          <Link
            href="https://www.instagram.com/ymkupnext"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </Link>
          <Link
            href="https://www.instagram.com/ymkupnext"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiLinkedin />
          </Link>
          <Link
            href="mailto:contactymk30@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CiMail />
          </Link>
        </div>
      </div>

      {/* Hero Text + Menu */}
      <div className="w-full flex justify-between py-4">
        <div className="flex flex-col gap-5">
          <h2 className="text-[15px] text-white tracking-[-0.02em]">
            Creative Strategist & Visual Storyteller
          </h2>
          <p className="text-[12px] text-[#9ca3af]">Scroll down to explore⬇</p>
        </div>

        {/* Menu Icon */}
        <div onClick={toggleMenu} className="cursor-pointer">
          <FiMenu fontSize={20} color="white" />
        </div>
      </div>

      {/* Menu Modal */}
      {menuOpen && (
  <div
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-56"
    onClick={toggleMenu}
  >
    <div
      className="bg-black border  text-white w-[80%] max-w-[400px] h-[30%] max-h-[400px] p-6 rounded-lg shadow-lg flex flex-col justify-center items-center space-y-6 animate-fadeIn"
      style={{ opacity: 1 }} // Ensure opacity starts visible
      onClick={(e) => e.stopPropagation()}
    >
      <Link
        href="/projects"
        className="text-lg hover:text-gray-300 transition"
        onClick={toggleMenu}
      >
        Projects
      </Link>
      <a
        href="#about"
        className="text-lg hover:text-gray-300 transition"
        onClick={toggleMenu}
      >
        About
      </a>
      <a
        href="#inquiry"
        className="text-lg hover:text-gray-300 transition"
        onClick={toggleMenu}
      >
        Inquiry
      </a>
    </div>
  </div>
)}


      {/* Marquee */}
      <div className="text-[16px] w-full overflow-hidden relative whitespace-nowrap mt-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 md:w-48 bg-gradient-to-r from-black via-black/50 to-transparent z-50"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 md:w-48 bg-gradient-to-l from-black via-black/50 to-transparent z-50"></div>

        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-marquee {
            animation: marquee 20s linear infinite;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s forwards;
          }
        `}</style>

        <div className="inline-flex items-center animate-marquee">
          {[...Array(2)].map((_, loopIndex) => (
            <div key={loopIndex} className="flex items-center">
              {marqueeItems.map((item, index) => (
                <div
                  key={`${loopIndex}-${index}`}
                  className="flex items-center mx-6 text-[#d1d5db]"
                >
                  <span className="whitespace-nowrap text-[20px] tracking-tighter text-[#949292]">
                    {item}
                  </span>
                  <span className="mx-6 text-[#4b5563]">•</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Hero;
