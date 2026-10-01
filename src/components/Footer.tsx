import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';
import { CoupleInfo } from '../types';

interface FooterProps {
  coupleInfo: CoupleInfo;
}

export const Footer: React.FC<FooterProps> = ({ coupleInfo }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 border-t border-rose-500/10 text-center text-xs text-slate-500 bg-[#090a12]/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-rose-300/80 font-handwriting text-2xl">
          <span>{coupleInfo.partner1}</span>
          <Heart className="w-4 h-4 fill-rose-500 text-rose-400 animate-pulse" />
          <span>{coupleInfo.partner2}</span>
        </div>

        <p className="text-slate-400 font-serif italic max-w-md">
          "Dù năm tháng có đổi thay, tình yêu này vẫn vẹn nguyên như những ngày đầu tiên."
        </p>

        <div className="flex items-center gap-4 text-slate-500 text-[11px] mt-2">
          <span>Khởi đầu từ {coupleInfo.startDate}</span>
          <span aria-hidden="true">·</span>
          <span>Trọn đời bên nhau</span>
        </div>

        <button
          onClick={scrollToTop}
          className="mt-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-rose-300 border border-slate-800 transition-colors text-xs cursor-pointer"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>Về đầu trang</span>
        </button>
      </div>
    </footer>
  );
};
