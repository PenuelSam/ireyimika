"use client";

import React from 'react'
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FiLinkedin } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import { FiMenu } from "react-icons/fi";
import Link from 'next/link';

const Hero = () => {
  const marqueeItems = [
  "Ile Ijo",
  "Engage Space",
  "Redlight Fashion Room",
  "Saint Moriartyy",
  "Section Studio"
];

  
  return (
    <>
      <div className='flex text-white items-center w-full justify-between'>
          <h1 className="text-[20px] uppercase tracking-[-0.02em]">adunola&nbsp; ireyimika</h1>
          <div className="text-[20px] flex gap-4">
            <Link href="https://www.instagram.com/ymkupnext" target="_blank"
              rel="noopener noreferrer" >
            <FaInstagram />
            </Link>
            {/* <FaXTwitter /> */}
            <Link href="https://www.instagram.com/ymkupnext" target="_blank"
              rel="noopener noreferrer" >
             <FiLinkedin />
            </Link>
             <Link href="mailto:contactymk30@gmail.com"
              target="_blank"
              rel="noopener noreferrer" >
            <CiMail />
             </Link>
          </div>
        </div>
        <div className="w-full flex justify-between py-4">
          <div className="flex flex-col gap-5">
            <h2 className="text-[15px] text-white tracking-[-0.02em]">Creative Strategist & Visual Storyteller</h2>
            <p className="text-[12px] text-[#9ca3af]">Scroll down to explore⬇</p>
          </div>
          <div>
            <FiMenu fontSize={20} color='white'/>
            {/* <p className="text-[14px] text-[#9ca3af]">Scroll down to explore⬇</p> */}
          </div>
        </div>
        <div className="text-[16px] w-full overflow-hidden relative whitespace-nowrap">
           {/* Dark faded edges */}
          
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
          `}</style>
          <div className="inline-flex items-center animate-marquee">
        {[...Array(2)].map((_, loopIndex) => (
    <div key={loopIndex} className="flex items-center">
      {marqueeItems.map((item, index) => (
        <div
          key={`${loopIndex}-${index}`}
          className="flex items-center mx-6 text-[#d1d5db]"
        >
          <span className="whitespace-nowrap text-[20px]  tracking-tighter text-[#949292]">{item}</span>
          <span className="mx-6 text-[#4b5563]">•</span>
        </div>
      ))}
    </div>
  ))}
</div>

        </div>
    </>
  )
}

export default Hero