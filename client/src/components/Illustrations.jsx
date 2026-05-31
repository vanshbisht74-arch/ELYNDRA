import React from 'react';

export const StarfallReachBG = () => (
  <svg viewBox="0 0 1000 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover">
    <rect width="1000" height="600" fill="#020617" />
    <defs>
      <radialGradient id="skyGrad" cx="50%" cy="100%" r="100%">
        <stop offset="0%" stopColor="#1e3a5f" />
        <stop offset="60%" stopColor="#0f172a" />
        <stop offset="100%" stopColor="#020617" />
      </radialGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
        <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect width="1000" height="600" fill="url(#skyGrad)" />

    {/* Floating Ruins */}
    <path d="M100 400 L300 400 L350 450 L50 450 Z" fill="#0f172a" stroke="#F7D88A" strokeWidth="0.5" />
    <path d="M600 350 L850 350 L900 400 L550 400 Z" fill="#0f172a" stroke="#F7D88A" strokeWidth="0.5" />
    <path d="M400 200 L500 200 L530 230 L370 230 Z" fill="#0f172a" stroke="#F7D88A" strokeWidth="0.5" />

    {/* Distant Spires */}
    <path d="M200 400 L200 300 L220 280 L240 300 L240 400" fill="#0f172a" stroke="#F7D88A" strokeWidth="0.5" />
    <path d="M700 350 L700 200 L720 180 L740 200 L740 350" fill="#0f172a" stroke="#F7D88A" strokeWidth="0.5" />

    {/* Magical Particles */}
    <circle cx="200" cy="200" r="2" fill="#F7D88A" filter="url(#glow)">
        <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="800" cy="150" r="1.5" fill="#6EE7F5" filter="url(#glow)">
        <animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite" />
    </circle>
    <circle cx="500" cy="100" r="1" fill="#fff" filter="url(#glow)">
        <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
    </circle>

    {/* Clouds */}
    <path d="M0 500 Q250 450 500 500 T1000 500 L1000 600 L0 600 Z" fill="rgba(255,255,255,0.05)" />
    <path d="M-100 550 Q150 500 400 550 T900 550 L900 600 L-100 600 Z" fill="rgba(255,255,255,0.03)" />
  </svg>
);

export const LuminaraHarborBG = () => (
    <svg viewBox="0 0 1000 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#020617" />
        <defs>
            <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#083344" />
                <stop offset="100%" stopColor="#020617" />
            </linearGradient>
        </defs>
        <rect width="1000" height="600" fill="url(#waterGrad)" />
        <path d="M0 400 L1000 400 L1000 600 L0 600 Z" fill="#083344" opacity="0.5" />
        {/* Harbor Structures */}
        <path d="M100 400 L100 250 L150 200 L200 250 L200 400" fill="#0f172a" stroke="#6EE7F5" strokeWidth="1" />
        <circle cx="150" cy="230" r="5" fill="#F7D88A" />
        <path d="M400 400 L400 300 L450 280 L500 300 L500 400" fill="#0f172a" stroke="#6EE7F5" strokeWidth="1" />
        <circle cx="450" cy="310" r="4" fill="#F7D88A" />
    </svg>
);

export const SylvaraWildsBG = () => (
    <svg viewBox="0 0 1000 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#022c22" />
        {/* Giant Trees */}
        <path d="M200 600 L250 200 L300 600" fill="#064e3b" stroke="#50C878" strokeWidth="1" />
        <path d="M700 600 L750 150 L800 600" fill="#064e3b" stroke="#50C878" strokeWidth="1" />
        <circle cx="250" cy="250" r="40" fill="#065f46" opacity="0.6" />
        <circle cx="750" cy="200" r="60" fill="#065f46" opacity="0.6" />
    </svg>
);

export const FrostveilCitadelBG = () => (
    <svg viewBox="0 0 1000 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#0f172a" />
        <path d="M0 600 L300 200 L500 400 L700 100 L1000 600 Z" fill="#1e293b" stroke="#E0F2F1" strokeWidth="1" />
        <path d="M300 200 L350 250 L250 250 Z" fill="#fff" opacity="0.2" />
        <path d="M700 100 L750 150 L650 150 Z" fill="#fff" opacity="0.2" />
    </svg>
);

export const AstralHollowBG = () => (
    <svg viewBox="0 0 1000 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#020617" />
        <circle cx="500" cy="300" r="150" fill="none" stroke="#B9A7FF" strokeWidth="0.5" strokeDasharray="10 20" />
        <circle cx="500" cy="300" r="100" fill="none" stroke="#B9A7FF" strokeWidth="0.2" />
        <path d="M480 300 L520 300 M500 280 L500 320" stroke="#F7D88A" strokeWidth="2" />
    </svg>
);
