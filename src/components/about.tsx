"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "early", label: "Early life and Creative formation" },
  { id: "career", label: "Career & Direction" },
];

const content: Record<string, string[]> = {
  overview: [
    "I didn’t start with a camera; I started with a fascination for how people pay attention. Under the name YMKUPNEXT, I’ve spent my career using photography and video to study more than just aesthetics, I’m looking for mood, identity, and the ‘why’ behind the image.",

    "My work exists at the intersection of visual storytelling and strategy. I’m less interested in chasing the next viral moment and more focused on how quiet, intentional stories can shape culture and behavior over time. Currently, I bring this perspective to The Section Studio as Head of Partnerships and Co-Creative Director, where I bridge the gap between creative vision and strategic alignment. For me, the goal is always the same: work that feels human, considered, and clear.",
  ],
 early: [
    "Before I ever had a formal title, I had observation. I spent my early years simply watching how people reacted to images, noticing how silence often carries more weight than an explanation, or how a specific rhythm can shift an emotion without a word being said.",

    "Photography and video became my first language, offering a way to understand the world without needing to over define it. My path wasn’t a straight line; it was driven by a mix of self-study and a deep curiosity for psychology and philosophy. By focusing on the process rather than the performance, I’ve been able to move from pure execution into intentional creative direction. Today, that visual discipline still guides my eye, but strategy and intent are what lead the way",
  ],
  career: [
    "Currently, I serve as the Head of Partnerships & Collaborations and Co-Creative Director at The Section Studio. In this dual role, I work at the intersection of relationships and execution, identifying brand partnerships that actually align with our vision and ensuring that every story we tell has a clear purpose.",

    "Parallel to my work at the studio, I’m documenting my own evolution from a visual creator into a strategist and marketer. I’m deeply interested in the mechanics of brand trust and how creative decisions influence perception over the long term. I don’t see myself as a finished product, but as someone ‘becoming’ a strategist who understands visuals because I lived inside them first, and a director who values the ‘why’ as much as the ‘how’.",
  ],
 
};

export default function About() {
  const [activeTab, setActiveTab] = useState("overview");
  const contentRef = useRef<HTMLDivElement>(null);

  const changeTab = (tab: string) => {
    if (tab === activeTab) return;

    const tl = gsap.timeline();

    tl.to(contentRef.current, {
      y: -40,
      opacity: 0,
      duration: 0.35,
      ease: "power2.in",
    }).set(contentRef.current, {
      y: 40,
    }).to(contentRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.45,
      ease: "power3.out",
    });

    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col">
      <h2 className="  text-2xl md:text-4xl font-bold mb-8 text-white">ABOUT</h2>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-15">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => changeTab(tab.id)}
              className={`
                relative rounded-lg border border-white/10
                px-4 py-2 text-sm font-medium
                transition-all duration-300 cursor-pointer
                ${
                  isActive
                    ? "bg-[#1f1e1e] text-white"
                    : "bg-black text-gray-400 hover:text-black"
                }
                hover:bg-[#1f1e1e] hover:text-white
                hover:-translate-y-0.5
              `}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="max-w-3xl overflow-hidden">
        <div ref={contentRef}>
        <h3  className="text-[18px] text-white font-semibold mb-4 capitalize">
          {tabs.find((t) => t.id === activeTab)?.label}
        </h3>
        <div className="space-y-4">
            {content[activeTab].map((paragraph, index) => (
                <p
                    key={index}
                    className="text-gray-400 text-[16px] leading-[1.6]"
                >
                    {paragraph}
                </p>
            ))}
        </div>
        </div>
      </div>
    </div>
  );
}
