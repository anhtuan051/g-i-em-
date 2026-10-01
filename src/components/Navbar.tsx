import React from 'react';
import { Mail } from 'lucide-react';
import { AudioPlayer } from './AudioPlayer';

interface NavbarProps {
  onReopenLetter: () => void;
  brandName: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onReopenLetter, brandName }) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0b0c16]/80 border-b border-rose-500/10 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-lg font-serif-romantic font-bold tracking-tight text-rose-100 hover:text-rose-300 transition-colors shrink-0"
        >
          {brandName}
        </a>

        {/* Zone 2: 4 clean text navigation links with smooth scrolling */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a
            href="#counter"
            className="hover:text-rose-300 transition-colors hover:underline decoration-rose-500/40 underline-offset-8"
          >
            Đếm Ngày
          </a>
          <a
            href="#story"
            className="hover:text-rose-300 transition-colors hover:underline decoration-rose-500/40 underline-offset-8"
          >
            Chuyện Chúng Ta
          </a>
          <a
            href="#gallery"
            className="hover:text-rose-300 transition-colors hover:underline decoration-rose-500/40 underline-offset-8"
          >
            Góc Polaroid
          </a>
          <a
            href="#letter"
            className="hover:text-rose-300 transition-colors hover:underline decoration-rose-500/40 underline-offset-8"
          >
            Bức Thư Cuối
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <AudioPlayer />

          <button
            onClick={onReopenLetter}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 rounded-full transition-all duration-200 shadow-sm shadow-rose-900/30 whitespace-nowrap cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mở lại thư</span>
          </button>
        </div>
      </div>
    </header>
  );
};
