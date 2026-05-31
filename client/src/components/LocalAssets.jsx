import React from 'react';

/**
 * Character Portraits
 */
export const CharacterPortrait = ({ name, className }) => {
  const illustrations = {
    'Lyra': (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="lyraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A5B4FC" />
            <stop offset="100%" stopColor="#818CF8" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="90" fill="rgba(129, 140, 248, 0.05)" stroke="rgba(247, 216, 138, 0.2)" strokeWidth="1" />
        <path d="M100 40 C70 40 50 70 50 100 C50 140 80 170 100 170 C120 170 150 140 150 100 C150 70 130 40 100 40 Z" fill="#0f172a" stroke="url(#lyraGrad)" strokeWidth="2" />
        <path d="M60 100 Q100 80 140 100" stroke="#818CF8" strokeWidth="1" opacity="0.4" />
        <circle cx="100" cy="80" r="25" fill="#0f172a" stroke="#818CF8" strokeWidth="1" />
        <path d="M95 75 L105 85 M105 75 L95 85" stroke="#F7D88A" strokeWidth="1.5" />
      </svg>
    ),
    'Mira Vey': (
      <svg viewBox="0 0 200 200" className={className}>
        <path d="M100 30 L160 160 L40 160 Z" fill="#0f172a" stroke="#6EE7F5" strokeWidth="2" />
        <circle cx="100" cy="110" r="20" fill="none" stroke="#F7D88A" strokeWidth="2" />
        <path d="M100 30 V60" stroke="#6EE7F5" strokeWidth="1" />
      </svg>
    ),
    'Cael Ardent': (
      <svg viewBox="0 0 200 200" className={className}>
        <rect x="50" y="50" width="100" height="100" fill="#0f172a" stroke="#3D6A8F" strokeWidth="2" rx="10" />
        <path d="M100 70 L120 100 L100 130 L80 100 Z" fill="#E0F2F1" opacity="0.8" />
        <path d="M50 100 H150 M100 50 V150" stroke="#3D6A8F" strokeWidth="1" opacity="0.3" />
      </svg>
    ),
    'Elder Rowan': (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="70" fill="none" stroke="#50C878" strokeWidth="2" />
        <path d="M100 40 C70 40 50 70 50 100 Q50 160 100 160 Q150 160 150 100 C150 70 130 40 100 40 Z" fill="#0f172a" stroke="#50C878" strokeWidth="2" />
        <path d="M100 160 V80" stroke="#50C878" strokeWidth="1" />
      </svg>
    ),
    'Seraphine Noct': (
      <svg viewBox="0 0 200 200" className={className}>
        <path d="M100 20 L180 100 L100 180 L20 100 Z" fill="#0f172a" stroke="#B9A7FF" strokeWidth="2" />
        <circle cx="100" cy="100" r="30" fill="none" stroke="#B9A7FF" strokeWidth="1" strokeDasharray="4 2" />
      </svg>
    )
  };
  return illustrations[name] || illustrations['Lyra'];
};

/**
 * Path Symbols
 */
export const PathSymbol = ({ name, className }) => {
  const symbols = {
    'Solara': (
      <svg viewBox="0 0 100 100" className={className}>
        <circle cx="50" cy="50" r="20" fill="#F7D88A" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
          <rect key={angle} x="48" y="10" width="4" height="15" fill="#F7D88A" transform={`rotate(${angle} 50 50)`} />
        ))}
        <circle cx="50" cy="50" r="40" fill="none" stroke="#F7D88A" strokeWidth="1" strokeDasharray="5 5" />
      </svg>
    ),
    'Tidelume': (
      <svg viewBox="0 0 100 100" className={className}>
        <path d="M50 20 C70 20 80 40 80 60 C80 80 65 90 50 90 C35 90 20 80 20 60 C20 40 30 20 50 20 Z" fill="none" stroke="#6EE7F5" strokeWidth="3" />
        <path d="M50 35 C60 35 65 45 65 55 C65 65 58 72 50 72" fill="none" stroke="#6EE7F5" strokeWidth="2" strokeLinecap="round" />
        <circle cx="50" cy="65" r="5" fill="#6EE7F5" />
      </svg>
    ),
    'Verdance': (
      <svg viewBox="0 0 100 100" className={className}>
        <path d="M50 10 L50 90 M50 90 L20 60 M50 90 L80 60" fill="none" stroke="#50C878" strokeWidth="3" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="#50C878" strokeWidth="2" />
        <path d="M30 40 Q50 10 70 40" fill="none" stroke="#50C878" strokeWidth="2" />
      </svg>
    ),
    'Zephyra': (
      <svg viewBox="0 0 100 100" className={className}>
        <path d="M20 50 Q35 20 50 50 T80 50" fill="none" stroke="#E0F2F1" strokeWidth="3" />
        <path d="M25 65 Q40 35 55 65 T85 65" fill="none" stroke="#E0F2F1" strokeWidth="2" opacity="0.6" />
        <path d="M15 35 Q30 5 45 35 T75 35" fill="none" stroke="#E0F2F1" strokeWidth="2" opacity="0.4" />
      </svg>
    ),
    'Umbralis': (
      <svg viewBox="0 0 100 100" className={className}>
        <circle cx="50" cy="50" r="35" fill="none" stroke="#B9A7FF" strokeWidth="3" />
        <circle cx="50" cy="50" r="15" fill="#B9A7FF" />
        <path d="M15 50 L85 50" stroke="#B9A7FF" strokeWidth="1" strokeDasharray="2 4" />
        <path d="M50 15 L50 85" stroke="#B9A7FF" strokeWidth="1" strokeDasharray="2 4" />
      </svg>
    )
  };
  return symbols[name] || symbols['Solara'];
};

/**
 * Item Icons
 */
export const ItemIcon = ({ name, className }) => {
  const icons = {
    'Echo Shard': (
      <svg viewBox="0 0 64 64" className={className}>
        <path d="M32 8 L44 32 L32 56 L20 32 Z" fill="#F7D88A" />
        <path d="M32 20 L38 32 L32 44 L26 32 Z" fill="#fff" opacity="0.5" />
      </svg>
    ),
    'Moonwater Vial': (
      <svg viewBox="0 0 64 64" className={className}>
        <path d="M22 20 Q32 10 42 20 L42 45 Q32 55 22 45 Z" fill="#6EE7F5" opacity="0.8" />
        <rect x="28" y="15" width="8" height="5" fill="#F7D88A" />
      </svg>
    ),
    'Traveler’s Satchel': (
      <svg viewBox="0 0 64 64" className={className}>
        <rect x="15" y="20" width="34" height="30" fill="#3D6A8F" rx="2" />
        <path d="M15 30 L32 45 L49 30" fill="none" stroke="#F7D88A" strokeWidth="2" />
      </svg>
    ),
    'Star Compass': (
      <svg viewBox="0 0 64 64" className={className}>
        <circle cx="32" cy="32" r="25" fill="none" stroke="#F7D88A" strokeWidth="2" />
        <path d="M32 15 L35 32 L32 49 L29 32 Z" fill="#F7D88A" />
        <path d="M15 32 L32 29 L49 32 L32 35 Z" fill="#6EE7F5" />
      </svg>
    ),
    'Healing Draught': (
      <svg viewBox="0 0 64 64" className={className}>
        <path d="M25 15 L39 15 L44 50 L20 50 Z" fill="#50C878" opacity="0.7" />
        <path d="M25 32 H39" stroke="#fff" strokeWidth="2" />
      </svg>
    )
  };
  return icons[name] || icons['Healing Draught'];
};

/**
 * Elyndra Emblem
 */
export const ElyndraEmblem = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F7D88A" />
        <stop offset="100%" stopColor="#B49048" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="45" fill="none" stroke="url(#goldGrad)" strokeWidth="1" strokeDasharray="60 10 20 15" strokeLinecap="round" />
    <circle cx="50" cy="50" r="30" fill="none" stroke="url(#goldGrad)" strokeWidth="0.5" strokeDasharray="5 5" opacity="0.5" />
    <path d="M50 20 L55 45 L80 50 L55 55 L50 80 L45 55 L20 50 L45 45 Z" fill="url(#goldGrad)" />
  </svg>
);
